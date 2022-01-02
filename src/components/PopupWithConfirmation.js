import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, buttonYesSelector}, buttonYesCallback) {
    super(popupSelector);
    this._buttonYesCallback = buttonYesCallback;
    this._buttonYes = this._popup.querySelector(buttonYesSelector);
  }

  setEventListeners() {
    super.setEventListeners();
    this._buttonYes.addEventListener(
      'click', (evt) => {
        this._buttonYesCallback();
      }
    );
  }
}
