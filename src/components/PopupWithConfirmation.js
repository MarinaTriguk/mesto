import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({popupSelector, buttonYesSelector}) {
    super(popupSelector);
    this._buttonYes = this._popup.querySelector(buttonYesSelector);
  }

  setButtonYesCallback(buttonYesCallback) {
    this._buttonYesCallback = buttonYesCallback;
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
