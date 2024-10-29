function enableValidation(optionsObject) {
  const formsList = Array.from(
    document.querySelectorAll(optionsObject.formSelector)
  );

  formsList.forEach((form) => {
    setEventListeners(form, optionsObject);
  });
}

const setEventListeners = (formElement, optionsObject) => {
  const inputList = Array.from(
    formElement.querySelectorAll(optionsObject.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    optionsObject.submitButtonSelector
  );

  toggleButtonState(
    inputList,
    buttonElement,
    optionsObject
  );

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, optionsObject);
      toggleButtonState(inputList, buttonElement, optionsObject);
    });
  });
};
const disableSubmitButton = (button, config) => {
  button.disabled = true;
  button.classList.add(config.inactiveButtonClass);
};

function toggleButtonState(inputList, buttonElement, config) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, config);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
}

function clearValidation(profileForm, validationConfig) {
  const inputList = Array.from(
    profileForm.querySelectorAll(validationConfig.inputSelector)
  );
  const buttonElement = profileForm.querySelector(
    validationConfig.submitButtonSelector
  );
  disableSubmitButton(buttonElement, validationConfig);
  inputList.forEach((input) => {
    hideInputError(profileForm, input, validationConfig);
  });
}

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  optionsObject
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(optionsObject.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(optionsObject.errorClass);
};

const hideInputError = (formElement, inputElement, optionsObject) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(optionsObject.inputErrorClass);
  errorElement.classList.remove(optionsObject.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, optionsObject) => {
  if (inputElement.validity.patternMismatch) {
    showInputError(
      formElement,
      inputElement,
      inputElement.dataset.errorMessage,
      optionsObject
    );
  } else if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      optionsObject
    );
  } else {
    hideInputError(formElement, inputElement, optionsObject);
  }
};

export { enableValidation, clearValidation };
