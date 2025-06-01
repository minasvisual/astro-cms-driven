type HtmlNode =
  | string
  | {
      $el: string;
      attrs?: Record<string, any>;
      children?: HtmlNode[];
    };

interface FormField {
  name: string;
  label: string;
  type?: string;
  ignore?: boolean;
  options?: Array<{ label: string; value: string | number }>;
}

interface HtmlSchemaField {
  $el: string;
  attrs?: Record<string, any>;
  children?: HtmlNode[];
}

interface FieldRenderer {
  render(field: FormField, value?: any): HtmlSchemaField;
}

class TextFieldRenderer implements FieldRenderer {
  render(field: FormField, value?: any): HtmlSchemaField {
    return {
      $el: 'input',
      attrs: {
        type: 'text',
        id: field.name,
        name: field.name,
        value: value ?? '',
      },
    };
  }
}

class TextareaFieldRenderer implements FieldRenderer {
  render(field: FormField, value?: any): HtmlSchemaField {
    return {
      $el: 'textarea',
      attrs: { id: field.name, name: field.name },
      children: [value ?? ''],
    };
  }
}

class SelectFieldRenderer implements FieldRenderer {
  render(field: FormField, value?: any): HtmlSchemaField {
    return {
      $el: 'select',
      attrs: { id: field.name, name: field.name },
      children: (field.options || []).map((opt) => ({
        $el: 'option',
        attrs: {
          value: opt.value,
          selected: opt.value === value,
        },
        children: [opt.label],
      })),
    };
  }
}

class ChoiceFieldRenderer implements FieldRenderer {
  constructor(private type: 'radio' | 'checkbox') {}

  render(field: FormField, value?: any): HtmlSchemaField {
    const selectedValues = Array.isArray(value) ? value : [value];
    return {
      $el: 'div',
      attrs: { class: '' },
      children: (field.options || []).map((opt) => ({
        $el: 'div',
        children: [
          {
            $el: 'input',
            attrs: {
              type: this.type,
              id: `${field.name}-${opt.value}`,
              name: field.name,
              value: opt.value,
              checked: selectedValues.includes(opt.value),
            },
          },
          {
            $el: 'label',
            attrs: { for: `${field.name}-${opt.value}` },
            children: [opt.label],
          },
        ],
      })),
    };
  }
}

function getRenderer(type: string = 'text'): FieldRenderer {
  switch (type) {
    case 'textarea':
      return new TextareaFieldRenderer();
    case 'select':
      return new SelectFieldRenderer();
    case 'radio':
      return new ChoiceFieldRenderer('radio');
    case 'checkbox':
      return new ChoiceFieldRenderer('checkbox');
    default:
      return new TextFieldRenderer();
  }
}

function renderToHtml(node: HtmlNode): string {
  if (typeof node === 'string') return node;
  const attrs = Object.entries(node.attrs || {})
    .filter(([_, value]) => value !== false && value != null)
    .map(([key, value]) =>
      key === 'checked' || key === 'selected' ? key : `${key}="${value}"`
    )
    .join(' ');
  const children = (node.children || []).map(renderToHtml).join('');
  return `<${node.$el}${attrs ? ' ' + attrs : ''}>${children}</${node.$el}>`;
}

export class FormBuilder {
  private schema: FormField[];

  constructor(schema: FormField[]) {
    this.schema = schema;
  }

  public getSchema(data: Record<string, any> = {}): HtmlSchemaField[] {
    return this.schema.map((field) => this.buildField(field, data[field.name]));
  }

  public getHtml(data: Record<string, any> = {}): string {
    return this.getSchema(data).map(renderToHtml).join('\n');
  }

  private buildField(field: FormField, value?: any): HtmlSchemaField {
    const labelNode: HtmlSchemaField = {
      $el: 'label',
      attrs: { for: field.name },
      children: [field.label],
    };

    const inputNode = getRenderer(field.type).render(field, value);

    return {
      $el: 'div',
      attrs: { class: 'form-group flex justify-between gap-2' },
      children: [labelNode, inputNode],
    };
  }
}
