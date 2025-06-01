import _ from 'lodash';

type TemplateValue = string | number | boolean;
type TemplateObject = { [key: string]: any };

interface ElementNode {
  $el: string;
  $if?: string;
  $else?: string;
  $for?: string | { data: string };
  $section?: string;
  attrs?: { [key: string]: string | TemplateValue };
  children?: Array<ElementNode | string>;
}

export class HTMLRenderer {
  private rootNode: ElementNode;
  private templateSettings: _.TemplateSettings;
  private compiledTemplates: Map<string, _.TemplateExecutor>;
  private sectionResolver: (slug: string) => Promise<string | ElementNode>;

  constructor(node: ElementNode, customSettings?: _.TemplateSettings) {
    this.rootNode = node;
    this.compiledTemplates = new Map();
    const { sectionResolver, imports } = customSettings || {};
    this.sectionResolver = sectionResolver || (async () => Promise.resolve(''));
    this.templateSettings = {
      ..._.templateSettings,
      interpolate: /\${([\s\S]+?)}/g,
      escape: /<%-([\s\S]+?)%>/g,
      evaluate: /<%([\s\S]+?)%>/g,
      imports,
    };
  }

  private isVoidElement(tagName: string): boolean {
    const voidElements = [
      'input',
      'img',
      'br',
      'hr',
      'meta',
      'link',
      'area',
      'base',
      'col',
      'command',
      'embed',
      'keygen',
      'param',
      'source',
      'track',
      'wbr',
    ];
    return voidElements.includes(tagName.toLowerCase());
  }

  private compileTemplate(template: string): _.TemplateExecutor {
    if (!this.compiledTemplates.has(template)) {
      const compiled = _.template(template, this.templateSettings);
      this.compiledTemplates.set(template, compiled);
    }
    return this.compiledTemplates.get(template)!;
  }

  private interpolate(
    value: string | TemplateValue,
    data: TemplateObject
  ): string {
    if (typeof value !== 'string') {
      return String(value);
    }

    try {
      const template = this.compileTemplate(value);
      return template(data);
    } catch (error) {
      console.error('Template interpolation error:', error);
      return '';
    }
  }

  private renderAttributes(
    attrs: { [key: string]: string | TemplateValue } | undefined,
    data: TemplateObject
  ): string {
    if (!attrs) return '';

    return Object.entries(attrs)
      .map(([key, value]) => {
        const interpolatedValue = this.interpolate(value, data);

        if (interpolatedValue === 'true' || interpolatedValue === 'false') {
          return interpolatedValue === 'true' ? key : '';
        }
        return `${key}="${interpolatedValue.replace(/"/g, '&quot;')}"`;
      })
      .filter((attr) => attr !== '')
      .join(' ');
  }

  private async renderLoop(
    node: ElementNode,
    data: TemplateObject
  ): Promise<string> {
    let children;
    if (node.$for) {
      let forExp = _.get(node, '$for.data', node.$for);
      let list = _.get(data, forExp.replace('$', ''), []);
      let isObject = typeof list === 'object' && !Array.isArray(list);
      let iterates = list;
      if (isObject) iterates = Object.keys(list);

      let proms = [];
      iterates.map(async (row, index) => {
        const $row = isObject ? list[row] : row;
        const $key = isObject ? row : index;
        node.children.map((child) =>
          proms.push(this.renderNode(child, { ...data, $row, $key }))
        );
      });
      children = (await Promise.all(proms)).join('');
    } else {
      children = (
        await Promise.all(
          node.children.map(async (child) => this.renderNode(child, data))
        )
      ).join('');
    }
    return children;
  }

  private async renderNode(
    node: ElementNode | string,
    data: TemplateObject
  ): Promise<string> {
    if (typeof node === 'string') {
      return this.interpolate(node, data);
    }

    if (node.$section) {
      if (!this.sectionResolver) return '';
      node = (await this.sectionResolver(
        node.$section
      )) as unknown as ElementNode;
      if (!node || typeof node !== 'object' || !node.$el) {
        return '';
      }
    }

    if (node.$if && this.interpolate(node.$if, data) !== 'true') {
      return node.$else || '';
    }

    const tag = node.$el;
    const attributes = this.renderAttributes(node.attrs, data);
    const openingTag = attributes ? `<${tag} ${attributes}` : `<${tag}`;

    if (this.isVoidElement(tag)) {
      return `${openingTag}>`;
    }

    const openingTagComplete = `${openingTag}>`;

    if (!node.children || node.children.length === 0) {
      return `${openingTagComplete}</${tag}>`;
    }

    let children = await this.renderLoop(node, data);

    return `${openingTagComplete}${children}</${tag}>`;
  }

  public async render(data: TemplateObject = {}): Promise<string> {
    return await this.renderNode(this.rootNode, data);
  }

  // Limpa o cache de templates compilados
  public clearCache(): void {
    this.compiledTemplates.clear();
  }
}
