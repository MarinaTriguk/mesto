import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(
    popupSelector,
    {
      formSelector,
      inputSelector,
      submitButtonSelector,
      submitButtonTextWhenNotBusy,
      submitButtonTextWhenBusy,
    },
    formSubmitCallback) {
    super(popupSelector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector(formSelector);
    this._inputList = Array.from(this._form.querySelectorAll(inputSelector));
    this._submitButton = this._popup.querySelector(submitButtonSelector);
    this._submitButtonTextWhenNotBusy = submitButtonTextWhenNotBusy;
    this._submitButtonTextWhenBusy = submitButtonTextWhenBusy;
    this._isBusy = false;
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
        if (!this._isBusy) {
          this._formSubmitCallback(this._getInputValues());
        }
      }
    );
  }

  close() {
    super.close();
    this._form.reset();
  }
  setIsBusy(isBusy = true) {
    this._isBusy = isBusy;
    this._submitButton.value = isBusy ? this._submitButtonTextWhenBusy : this._submitButtonTextWhenNotBusy;
  }
}

