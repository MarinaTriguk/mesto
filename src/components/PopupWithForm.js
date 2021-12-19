import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, formSelector, inputSelector}, formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
  }

  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(
      input => inputValues[input.name] = input.value
    );
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener (
      'submit', (evt) => {
        evt.preventDefault();
        this._formSubmitCallback(this._getInputValues());
      }
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

}

