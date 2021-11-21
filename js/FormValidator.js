export class FormValidator {
  constructor(validationSettings, formElement) {
    this._validationSettings = validationSettings;
    this._formElement = formElement;
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
    const inputList = this._getInputList();
    inputList.forEach((inputElement) => this._clearInputTouchedState(inputElement));
  }

  _setAllFormInputsTouchedState() {
    const inputList = this._getInputList();
    inputList.forEach((inputElement) => this._setInputTouchedState(inputElement));
  }

  _updateInputValidity(inputElement) {
    if (!inputElement.validity.valid && this._inputIsTouched(inputElement)) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  };

  formIsValid() {
    const inputList = this._getInputList();
    return inputList.every((inputElement) => inputElement.validity.valid);
  }

  _updateButtonState() {
    const buttonElement = this._formElement.querySelector(this._validationSettings.submitButtonSelector);
    if (this.formIsValid()) {
      buttonElement.classList.remove(this._validationSettings.inactiveButtonClass);
    } else {
      buttonElement.classList.add(this._validationSettings.inactiveButtonClass);
    }
  };

  _processInputEvent(inputElement) {
    this._setInputTouchedState(inputElement);
    this._updateInputValidity(inputElement);
    this._updateButtonState();
  }

  _setEventListeners() {
    const inputList = this._getInputList();
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._processInputEvent(inputElement);
      });
    });
  };

  _updateFormValidity() {
    const inputList = this._getInputList();
    inputList.forEach((inputElement) => {
      this._updateInputValidity(inputElement);
    });
    this._updateButtonState();
  }

  prepareFormForUserInput() {
    this._clearAllFormInputsTouchedState();
    this._updateFormValidity();
  }
  prepareFormForSubmit() {
    this._setAllFormInputsTouchedState();
    this._updateFormValidity();
  }

  enableValidation() {
    this._setEventListeners(this._formElement, this._validationSettings);
  }
}