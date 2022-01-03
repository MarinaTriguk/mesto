export default class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
    this._buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    this._inputList = this._getInputList();
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationSettings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._validationSettings.errorVisibleClass);
  };

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationSettings.inputErrorClass);
    errorElement.classList.remove(this._validationSettings.errorVisibleClass);
    errorElement.textContent = '';
  };

  _inputIsTouched(inputElement) {
    return inputElement.classList.contains(this._validationSettings.inputTouchedClass);
  };

  _setInputTouchedState(inputElement) {
    if (!this._inputIsTouched(inputElement, this._validationSettings)) {
      inputElement.classList.add(this._validationSettings.inputTouchedClass);
    }
  }

  _clearInputTouchedState(inputElement) {
    if (this._inputIsTouched(inputElement, this._validationSettings)) {
      inputElement.classList.remove(this._validationSettings.inputTouchedClass);
    }
  }

  _getInputList() {
    return Array.from(this._formElement.querySelectorAll(this._validationSettings.inputSelector));
  }

  _clearAllFormInputsTouchedState() {
    this._inputList.forEach((inputElement) => this._clearInputTouchedState(inputElement));
  }

  _setAllFormInputsTouchedState() {
    this._inputList.forEach((inputElement) => this._setInputTouchedState(inputElement));
  }

  _updateInputValidity(inputElement) {
    if (!inputElement.validity.valid && this._inputIsTouched(inputElement)) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  formIsValid() {
    return this._inputList.every((inputElement) => inputElement.validity.valid);
  }

  _updateButtonState() {
    if (this.formIsValid()) {
      this._buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
      this._buttonElement.removeAttribute('disabled');
    } else {
      this._buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
      this._buttonElement.setAttribute('disabled', 'disabled');
    }
  };

  _processInputEvent(inputElement) {
    this._setInputTouchedState(inputElement);
    this._updateInputValidity(inputElement);
    this._updateButtonState();
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._processInputEvent(inputElement);
      });
    });
  };

  _updateFormValidity() {
    this._inputList.forEach((inputElement) => {
      this._updateInputValidity(inputElement);
    });
    this._updateButtonState();
  }

  prepareFormForUserInput() {
    this._clearAllFormInputsTouchedState();
    this._updateFormValidity();
  }

  enableValidation() {
    this._setEventListeners();
  }
}