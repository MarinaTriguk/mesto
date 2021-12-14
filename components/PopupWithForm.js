 class PopupWithForm extends Popup {
  constructor(selector, formSubmitCallback) {
    super(selector);
    this._formSubmitCallback = formSubmitCallback;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._formValues = this._form.value;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener (
      'submit', this._formSubmitCallback
    );
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

 }

