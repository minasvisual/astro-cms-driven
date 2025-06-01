export class HtmlToJsonParser {
  constructor(element) {
    if (!(element instanceof HTMLElement)) {
      throw new Error('O parâmetro deve ser um elemento HTML.');
    }
    this.root = element;
  }

  parseElement(el) {
    const obj = {
      $el: el.tagName.toLowerCase(),
    };

    // Adiciona atributos, se houver
    if (el.attributes.length > 0) {
      obj.attrs = {};
      for (let attr of el.attributes) {
        obj.attrs[attr.name] = attr.value;
      }
    }

    // Adiciona filhos
    const children = [];
    for (let node of el.childNodes) {
      if (node.nodeType === Node.TEXT_NODE) {
        const trimmedText = node.textContent.trim();
        if (trimmedText) children.push(trimmedText);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        children.push(this.parseElement(node));
      }
    }

    if (children.length > 0) {
      obj.children = children;
    }

    return obj;
  }

  toJSON() {
    return this.parseElement(this.root);
  }
}
