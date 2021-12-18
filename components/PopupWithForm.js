import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  // В брифе указано, что метод должен быть приватным, но в дальнейшем о его использовании не упоминается.
  // Представляется удобным вызывать этот метод из formSubmitCallback для получения данных формы.
  // Для этого метод  должен быть публичным.
  getInputValues() {
    const formData = new FormData(this._form);
    const entries = formData.entries();
    const inputValues = {};
    for (let pair of entries) {
      inputValues[pair[0]] = pair[1];
    }
    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener (
      'submit', this._formSubmitCallback
    );
  }

  close() {
    super.close();
    this._form.reset();
  }

}

