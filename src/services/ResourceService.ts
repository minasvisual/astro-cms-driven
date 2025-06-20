import _ from 'lodash';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface PaginationConfig {
  local?: boolean;
  pageField?: string;
  limitField?: string;
  sortField?: string;
  sortExp?: string;
  sortAscChar?: string;
  sortDescChar?: string;
  filterField?: string;
  filterExp?: string;
}

interface CrudConfig {
  baseUrl: string;
  urlGet?: string;
  urlGetById?: string;
  urlPost?: string;
  urlPatch?: string;
  urlDelete?: string;
  methodGet?: HttpMethod;
  methodGetById?: HttpMethod;
  methodPost?: HttpMethod;
  methodPatch?: HttpMethod;
  methodDelete?: HttpMethod;
  getData?: boolean;
  getDataById?: boolean;
  wrapData?: string;
  wrapDataById?: string;
  totalData?: string;
  pagination?: PaginationConfig | false;
  params?: Record<string, any>;
  headers?: Record<string, any>;
  body?: Record<string, any>;
}

interface GetAllOptions {
  filters?: Record<string, any>;
  sort?: string;
  page?: number;
  limit?: number;
}
export class ResourceService {
  private config: CrudConfig;

  constructor(config: CrudConfig) {
    this.config = config;
  }

  // Interpolação usando lodash.template
  private interpolate(
    templateStr: string,
    context: Record<string, any>
  ): string {
    try {
      const compiled = _.template(templateStr, {
        interpolate: /{([\s\S]+?)}/g,
      });
      return compiled(context);
    } catch (e) {
      console.warn('Erro de interpolação:', templateStr, context);
      return templateStr;
    }
  }

  // Constrói parâmetros interpolados
  private buildInterpolatedObject(
    obj: Record<string, any>,
    context: Record<string, any>
  ): Record<string, any> {
    const result: Record<string, any> = {};
    for (const key in obj) {
      const value = obj[key];
      if (typeof value === 'string') {
        result[key] = this.interpolate(value, context);
      } else if (Array.isArray(value)) {
        result[key] = value.map((v) =>
          typeof v === 'string' ? this.interpolate(v, context) : v
        );
      } else if (typeof value === 'object' && value !== null) {
        result[key] = this.buildInterpolatedObject(value, context);
      } else {
        result[key] = value;
      }
    }
    return result;
  }

  private buildQueryParams(params: Record<string, any>): string {
    const query: string[] = [];
    for (const key in params) {
      const value = params[key];
      if (Array.isArray(value)) {
        value.forEach((val) =>
          query.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`)
        );
      } else {
        query.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
    return query.length ? `?${query.join('&')}` : '';
  }

  private buildUrl(
    template: string | undefined,
    context: Record<string, any>,
    fallback: string
  ): string {
    const path = this.interpolate(template ?? fallback, context);
    return `${this.config.baseUrl}${path}`;
  }

  private buildHeaders(context: Record<string, any>): Record<string, string> {
    return this.buildInterpolatedObject(this.config.headers || {}, context);
  }

  private buildBody(context: Record<string, any>): any {
    return this.buildInterpolatedObject(this.config.body || {}, context);
  }

  private buildParams(context: Record<string, any>): Record<string, any> {
    return this.buildInterpolatedObject(this.config.params || {}, context);
  }

  private buildPaginationParams(options: GetAllOptions): Record<string, any> {
    const { sort, page, limit, ...filters } = options || {};
    const result: Record<string, any> = {};
    const pg = this.config.pagination;
    const prm = this.config.params;

    if (!pg || typeof pg !== 'object') return result;
 
    if (pg.limitField) {
      result[pg.limitField] = _.get(prm, pg.limitField, limit);
    }

    // Paginação
    if (pg.limitField && pg.pageField) {
      result[pg.pageField] = page ?? 1;
    }


    // Ordenação
    if (sort && typeof sort === 'string'  && pg.sortField && pg.sortExp) {
      const [prop, order] = sort.startsWith('-')
        ? [sort.substring(1), 'desc']
        : [sort, 'asc'];

      result[pg.sortField] = this.interpolate(pg.sortExp, {
        prop,
        sort: order === 'asc' ? (pg.sortAscChar ?? 'asc') : (pg.sortDescChar ?? 'desc'),
      });
    }

    // Filtros
    if (filters && pg.filterField) {
      for (const prop in filters) {
        const val = filters[prop];
        if (
          val === undefined ||
          val === null ||
          val === '' ||
          (typeof val === 'number' && isNaN(val))
        ) continue;

        const field = this.interpolate(pg.filterField, { prop });
        result[field] = pg.filterExp
          ? this.interpolate(pg.filterExp, { value: val, prop })
          : val;
      }
    }

    return result;
  } 

  // ======================== Métodos CRUD =============================

  async getAll(
    options: GetAllOptions = {}
  ): Promise<{ data: any[]; total: number }> {
    const { 
      sort, 
      page, 
      limit, 
      ...filters
    } = options;

    const paginationParams = this.buildPaginationParams(options);
    const fixedParams = this.buildParams(options);
    const allParams = { ...fixedParams, ...paginationParams };

    const url = this.buildUrl(this.config.urlGet, { query: '' }, '/');
    const fullUrl = `${url}${this.buildQueryParams(allParams)}`;

    console.debug('Fetching URL:', fullUrl)
    const res = await fetch(fullUrl, {
      method: this.config.methodGet || 'GET',
      headers: this.buildHeaders(allParams),
      body: this.config.body
        ? JSON.stringify(this.buildBody(allParams))
        : undefined,
    });

    const json = await res.json();
    const data = this.config.wrapData ? json[this.config.wrapData] : json;
    const total = this.config.totalData
      ? json[this.config.totalData]
      : Array.isArray(data)
      ? data.length
      : 0;
    return { data, total };
  }

  async getById(
    id: string | number,
    query: Record<string, any> = {}
  ): Promise<any> {
    const url = this.buildUrl(
      this.config.urlGetById,
      { id, query: '' },
      `/${id}`
    );
    const fullUrl = `${url}${this.buildQueryParams(query)}`;

    const res = await fetch(fullUrl, {
      method: this.config.methodGetById || 'GET',
      headers: this.buildHeaders({ id, ...query }),
    });

    const json = await res.json();
    return this.config.wrapDataById ? json[this.config.wrapDataById] : json;
  }

  async create(data: any): Promise<any> {
    const url = this.buildUrl(this.config.urlPost, {}, '/');
    const res = await fetch(`${url}`, {
      method: this.config.methodPost || 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...this.buildHeaders(data),
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  async update(id: string | number, data: any): Promise<any> {
    const url = this.buildUrl(this.config.urlPatch, { id }, `/${id}`);
    const res = await fetch(`${url}`, {
      method: this.config.methodPatch || 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...this.buildHeaders(data),
      },
      body: JSON.stringify(data),
    });
    return await res.json();
  }

  async delete(id: string | number): Promise<any> {
    const url = this.buildUrl(this.config.urlDelete, { id }, `/${id}`);
    const res = await fetch(`${url}`, {
      method: this.config.methodDelete || 'DELETE',
      headers: this.buildHeaders({ id }),
    });
    return await res.json();
  }
}
