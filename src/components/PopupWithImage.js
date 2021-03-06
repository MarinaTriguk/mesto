import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({popupSelector, popupImageSelector}) {
    super(popupSelector);
    this._image = this._popup.querySelector(popupImageSelector);
}
  open({name, link}) {
    this._image.src = link;
    this._image.alt = name;
    this._image.textContent = name;
    super.open();
  }
}



