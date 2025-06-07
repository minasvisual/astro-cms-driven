import axios from "axios";

export type routeSchema = {
  label: string;
  url: string; // pathname ex '/dash'
  icon?: string; // font awesome class ex 'fa fa-icon'
  target?: 'public' | 'logged' | 'dashboard';
  schema?: any;
}

var router = {}
export class PagesService {
  private pages: any[] = [];
  protected SOURCE_URL = import.meta.env.SOURCE_URL

  constructor(){
    this.loadMenus();
  }

  async loadMenus(force = false): Promise<{ [url: string]: routeSchema }> {
    if( !force && Object.keys(router).length > 0 ) return router;
    const { data:menus } = await axios.get(import.meta.env.SOURCE_URL + '?fields=id,label,url,icon,target'); 
    router = menus.reduce((acc, m) => {
      acc[m.url] = m;
      return acc
    }, ({}))
    return router;
  }

  async getMenus(targets:string[] = []): Promise<routeSchema[]> {
    await this.loadMenus()
    const menus = Object.keys(router).filter(
      m => targets.includes(router[m].target) 
    )
    console.log('get menus', menus)
    return menus.map(m => ({ ...router[m], path:m }))
  }

  async getRouteSchema(url: string): Promise<any> {    
    const {data} = await axios.get(this.SOURCE_URL + `?filter=url,eq,${url}`);
    console.log('getRouteSchema', data)
    if( data.length === 0 ) throw new Error(`Page not found: ${url}`);
    return data[0].schema
  }

  async matchRoute(url: string){
    try {
      await this.loadMenus()
      const routerKeys = Object.keys(router);
      for (const route of routerKeys) {
        // Transforma /page/:id/test/:id2 em ^/page/[^/]+/test/[^/]+$
        const pattern = route.replace(/:[^/]+/g, '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        if (regex.test(url)) { 
          const record = router[route]
          return {
            route,
            ...record,
            schema: await this.getRouteSchema(route),
          };
        }
      }
      return false;
    } catch (error) {
      throw new Error('Error matching route: ' + error.message);
    }
  }
}