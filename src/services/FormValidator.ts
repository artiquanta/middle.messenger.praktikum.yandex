import { PATTERNS, VALIDATION_ERRORS } from "../utils/constants";

class FormValidator {
  _inputValidity: Record<string, boolean>;
  _formButton: HTMLElement;
  constructor({ options, inputs }) {
    const { form, inputErrorSelector, buttonSelector } = options;
    // берём форму и с ней работаем
    this._form = form;
    this._formButton = this._form.querySelector(`.${buttonSelector}`);
    this._inputErrorSelector = inputErrorSelector;
    this._inputValidity = {};
    this._passwordValues = {};
    this.createInputList(inputs);
    this.initialCheckForm(this._formButton);

  }

  createInputList(inputs) {
    inputs.forEach((input) => {
      this.validateInput(input.name, input.value);
    });
  }

  handleChange(evt) {
    const { target } = evt;
    const { name, value } = target;
    this.validateInput(name, value);
    this.setError(evt);
    this.checkFromValid(evt);
    console.log(this._inputValidity)
    //console.log(target.closest('form').checkValidity())
  }

  setError(evt) {
    const input = evt.target;
    const label = input.closest('label');
    const errorElement = label.querySelector(`.${this._inputErrorSelector}`);
    if (this._inputValidity[evt.target.name]) {
      errorElement.textContent = '';
      input.classList.remove('form-input__input_type_error');
    } else {
      errorElement.textContent = VALIDATION_ERRORS[`${evt.target.name.toUpperCase()}_ERROR`];
      input.classList.add('form-input__input_type_error');
    }
  }

  initialCheckForm(button) {
    const isValid = !Object.values(this._inputValidity).some((element) => element === false);
    if (isValid) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }

  checkFromValid(evt) {
    this.isValid = !Object.values(this._inputValidity).some((element) => element === false);
    //console.log(evt.target.closest('form').checkValidity());
    if (this.isValid) {
      evt.target.closest('form').querySelector('.form__button').removeAttribute('disabled');
    } else {

      evt.target.closest('form').querySelector('.form__button').setAttribute('disabled', true);
    }
  }

  setFormValidity() {

  }

  validateInput(name, value) {
    if (name === 'password' || name === 'oldPassword' || name === 'newPassword') {
      Object.assign(this._passwordValues[name] = value);
    }

    if (name === 'repeat_password') {
      const isSamePassword = this._passwordValues['newPassword'] === value;
      Object.assign(this._inputValidity, {[name]: isSamePassword});
      return
    }

    const pattern = PATTERNS[`${name.toUpperCase()}_PATTERN`];
    if (pattern) {
      Object.assign(this._inputValidity, { [name]: pattern.test(value) });
    } else {
      Object.assign(this._inputValidity, { [name]: true });
    }


    //Object.assign(this._inputValidity, {[name]: PATTERNS[`${name.toUpperCase()}_PATTERN`].test(value)})
    /*     switch (name) {
          case 'first_name':
            Object.assign(this._inputValidity, { [name]: NAME_PATTERN.test(value) });
            break;
          case 'second_name':
            Object.assign(this._inputValidity, { [name]: NAME_PATTERN.test(value) });
            break;
          case 'login':
            Object.assign(this._inputValidity, { [name]: LOGIN_PATTERN.test(value) })
            break;
          case 'email':
            Object.assign(this._inputValidity, { [name]: EMAIL_PATTERN.test(value) });
            break;
          case 'password':
            Object.assign(this._inputValidity, { [name]: PASSWORD_PATTERN.test(value) });
            break;
          case 'phone':
            Object.assign(this._inputValidity, { [name]: PHONE_PATTERN.test(value) });
            break;
          case 'message':
            Object.assign(this._inputValidity, { [name]: MESSAGE_PATTERN.test(value) });
            break;
          default:
            break;
        } */
  }
}

export default FormValidator;
