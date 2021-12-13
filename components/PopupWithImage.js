class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
    this._image = this._popup.querySelector('.popup__image');
}
  openPopup(name, link) {
    this._image.setAttribute('src', link);
    this._image.setAttribute('alt', name);
    this._image.textContent = name;
    super.openPopup();
  }
}



