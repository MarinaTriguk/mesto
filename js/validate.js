const showInputError = (formElement, inputElement, errorMessage, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSettings.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSettings.errorVisibleClass);
};

const hideInputError = (formElement, inputElement, validationSettings) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSettings.inputErrorClass);
  errorElement.classList.remove(validationSettings.errorVisibleClass);
  errorElement.textContent = '';
};
const inputIsTouched = (inputElement, validationSettings) => inputElement.classList.contains(validationSettings.inputTouchedClass);

const setInputTouchedState = (inputElement, validationSettings) => {
  if (!inputIsTouched(inputElement, validationSettings)) {
    inputElement.classList.add(validationSettings.inputTouchedClass);
  }
}

const clearInputTouchedState = (inputElement, validationSettings) => {
  if (inputIsTouched(inputElement, validationSettings)) {
    inputElement.classList.remove(validationSettings.inputTouchedClass);
  }
}

const getInputList = (formElement, validationSettings) => Array.from(formElement.querySelectorAll(validationSettings.inputSelector))

const clearAllFormInputsTouchedState = (formElement, validationSettings) => {
  const inputList = getInputList(formElement, validationSettings);
  inputList.forEach((inputElement) => clearInputTouchedState(inputElement, validationSettings));
}

const setAllFormInputsTouchedState = (formElement, validationSettings) => {
  const inputList = getInputList(formElement, validationSettings);
  inputList.forEach((inputElement) => setInputTouchedState(inputElement, validationSettings));
}


const updateInputValidity = (formElement, inputElement, validationSettings) => {
  if (!inputElement.validity.valid && inputIsTouched(inputElement, validationSettings)) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationSettings);
  } else {
    hideInputError(formElement, inputElement, validationSettings);
  }
};

const formIsValid = (formElement, validationSettings) => {
  const inputList = getInputList(formElement, validationSettings);
  return inputList.every((inputElement) => inputElement.validity.valid);
}

const updateButtonState = (formElement, validationSettings) => {
  const buttonElement = formElement.querySelector(validationSettings.submitButtonSelector);
  if (formIsValid(formElement, validationSettings)) {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass);
  } else {
    buttonElement.classList.add(validationSettings.inactiveButtonClass);
  }
};


const setEventListeners = (formElement, validationSettings) => {
  const inputList = getInputList(formElement, validationSettings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      setInputTouchedState(inputElement, validationSettings);
      updateInputValidity(formElement, inputElement, validationSettings);
      updateButtonState(formElement, validationSettings);
    });
  });
};

const updateFormValidity = (formElement, validationSettings) => {
  const inputList = getInputList(formElement, validationSettings);
  inputList.forEach((inputElement) => {
    updateInputValidity(formElement, inputElement, validationSettings);
  });
  updateButtonState(formElement, validationSettings);
}

const enableValidation = (validationSettings) => {
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
}

const prepareFormForUserInput = (formElement, validationSettings) => {
  clearAllFormInputsTouchedState(formElement, validationSettings);
  updateFormValidity(formElement, validationSettings);
}
const prepareFormForSubmit = (formElement, validationSettings) => {
  setAllFormInputsTouchedState(formElement, validationSettings);
  updateFormValidity(formElement, validationSettings);
}