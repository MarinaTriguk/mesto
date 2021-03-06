export default class Section {
  constructor({ data, renderer }, selector) {
    this._items = data;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  setItems(items) {
    this._items = items;
  }

  renderItems() {
    this._items.forEach(item => this._renderer(item));
  }

  addItem(domElement, prepend = false) {
    if (prepend) {
      this._container.prepend(domElement);
    } else {
      this._container.append(domElement);
    }
  }
}