export default class Templator {
  constructor({ template, selector, values }) {
    this._template = template;
    this._selector = `.${selector}`;
    this._values = values;
    this._elements = [];
  }

  generateElement() {
    this._values.forEach((element) => {
      for (this.value in element) {
        this._template = this._template.replace(`{${this.value}}`, element[this.value]);
      }
      this._elements.push(this._template);
    });

    return this._elements;
  }

  renderElement(elements) {
    elements.forEach((element) => {
      document.querySelector(this._selector).insertAdjacentHTML('beforeend', element);
    });
  }
}
