import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    const formData = new FormData(this._form);
    const entries = formData.entries();
    const inputValues = {};
    for (let pair of entries) {
      inputValues[pair[0]] = pair[1];
    }
    return inputValues;
  }

  _formSubmit(evt) {
    evt.preventDefault();
    const data = this._getInputValues();
    this._formSubmitCallback(data);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener (
      'submit', this._formSubmit.bind(this)
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

}

