export default class Section {
  constructor({ data, renderer }, selector) {
    this._items = data;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  _clear() {
    this._container.innerHTML = '';
  }

  renderItems() {
    this._clear();
    this._items.forEach(item => this._container.append(this._renderer(item)))
  }

  appendItem(item) {
    this._items.push(item);
    this._container.append(this._renderer(item));
  }

  prependItem(item) {
    this._items.unshift(item);
    this._container.prepend(this._renderer(item));
  }
}