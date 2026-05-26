const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible"
};

const showInputError = (formElement, inputElement, config) => {
const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

	if (!errorElement) {
		return;
	}

	inputElement.classList.add(config.inputErrorClass);
	errorElement.textContent = inputElement.validationMessage;
	errorElement.hidden = false;
	errorElement.classList.add(config.errorClass);
};

const hideInputError = (formElement, inputElement, config) => {
	const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

	if (!errorElement) {
		return;
	}

	inputElement.classList.remove(config.inputErrorClass);
	errorElement.textContent = "";
	errorElement.hidden = true;
	errorElement.classList.remove(config.errorClass);
};

const checkInputValidity = (formElement, inputElement, config) => {
	if (!inputElement.validity.valid) {
		showInputError(formElement, inputElement, config);
	} else {
		hideInputError(formElement, inputElement, config);
	}
};

const hasInvalidInput = (inputList) => {
	return inputList.some((inputElement) => {
		return !inputElement.validity.valid;
	});
};

const toggleButtonState = (inputList, buttonElement, config) => {
	if (hasInvalidInput(inputList)) {
		buttonElement.disabled = true;
		buttonElement.classList.add(config.inactiveButtonClass);
	} else {
		buttonElement.disabled = false;
		buttonElement.classList.remove(config.inactiveButtonClass);
	}
};

const setEventListeners = (formElement, config) => {
	const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const buttonElement = formElement.querySelector(config.submitButtonSelector);

	if (!buttonElement) {
		return;
	}

	toggleButtonState(inputList, buttonElement, config);

	inputList.forEach((inputElement) => {
		inputElement.addEventListener("input", () => {
			checkInputValidity(formElement, inputElement, config);
			toggleButtonState(inputList, buttonElement, config);
		});
	});
};

const clearValidation = (formElement, config) => {
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
	const buttonElement = formElement.querySelector(config.submitButtonSelector);

    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, config);
    });

    if(buttonElement) {
        toggleButtonState(inputList, buttonElement, config);
    }
};

const enableValidation = (config) => {
	const formList = document.querySelectorAll(config.formSelector);

	formList.forEach((formElement) => {
		setEventListeners(formElement, config);
	});
};

enableValidation(settings);
