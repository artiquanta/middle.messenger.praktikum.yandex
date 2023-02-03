import { PATTERNS, VALIDATION_ERRORS } from '../utils/constants';

type Options = {
  withButton: boolean,
  withTextError: boolean,
};

type FormData = {
  formName: string,
  buttonSelector?: string,
  inputErrorTextSelector?: string,
  inputErrorClass: string,
  inputPasswordName?: string,
};

interface IConstructor { formData: FormData, options: Options }

type InputValidity = Record<string, boolean>;

class FormValidator {
  private _withButton: boolean;

  private _withTextError: boolean;

  private _form: HTMLFormElement;

  private _inputs: NodeListOf<HTMLInputElement>;

  private _formButton: HTMLButtonElement;

  private _inputErrorTextSelector: string;

  private _inputErrorClass: string;

  private _inputPasswordName: string;

  private _passwordValues: Record<string, string>;

  private _inputValidity: InputValidity;

  constructor({ options, formData }: IConstructor) {
    const { withButton, withTextError } = options;
    const {
      formName,
      buttonSelector,
      inputErrorTextSelector,
      inputErrorClass,
      inputPasswordName,
    } = formData;

    this._withButton = withButton;
    this._withTextError = withTextError;
    this._form = document.getElementById(formName)! as HTMLFormElement;
    this._inputs = this._form.querySelectorAll('input');
    this._inputErrorClass = inputErrorClass;

    // Если нужно менять состояние кнопки формы
    if (withButton) {
      this._formButton = this._form.querySelector(`.${buttonSelector}`)!;
    }

    // Если нужно выводить сообщения об ошибке валидации
    if (withTextError) {
      this._inputErrorTextSelector = inputErrorTextSelector!;
    }

    if (inputPasswordName) {
      this._inputPasswordName = inputPasswordName;
    }

    this._inputValidity = {};
    this._passwordValues = {};
    this._initialInputsValidation();

    // Первоначальная проверка состояния формы
    if (withButton) {
      this._checkFromValid();
    }
  }

  // Первоначальное наполнение объекта состояния валидации
  // текущими состояниями валидации полей ввода
  private _initialInputsValidation(): void {
    this._inputs.forEach((input: HTMLInputElement): void => {
      this._validateInput(input.name, input.value, input.validity.valid);
    });
  }

  // Удаление сообщения об ошибке
  private _cleanError(evt: Event): void {
    const input = (evt.target as HTMLInputElement);
    const label: HTMLLabelElement = input.closest('label')!;
    const error: HTMLSpanElement = label.querySelector(`.${this._inputErrorTextSelector}`)!;
    error.textContent = '';
    input.classList.remove(this._inputErrorClass);
  }

  // Управление сообщением об ошибке поля ввода
  public manageTextError(evt: Event): void {
    const input = (evt.target as HTMLInputElement);
    const label: HTMLLabelElement = input.closest('label')!;
    const error: HTMLSpanElement = label.querySelector(`.${this._inputErrorTextSelector}`)!;

    // Если ошибки валидации отсутствуют - убрать сообщения об ошибке, иначе - добавить
    if (this._inputValidity[input.name]) {
      error.textContent = '';
      input.classList.remove(this._inputErrorClass);
    } else {
      error.textContent = VALIDATION_ERRORS[`${input.name.toUpperCase()}_ERROR`];
      input.classList.add(this._inputErrorClass);
    }
  }

  // Управление состоянием инпута для форм без отображения текста ошибки
  public setInputErrorState(evt: Event): void {
    const input = (evt.target as HTMLInputElement);
    if (this._inputValidity[input.name]) {
      input.classList.remove(this._inputErrorClass);
    } else {
      input.classList.add(this._inputErrorClass);
    }
  }

  // Проверка валидности формы / Интегрировать с первоначальной с опциональным параметром?
  private _checkFromValid(): boolean {
    const isFormValid: boolean = !Object.values(this._inputValidity)
      .some((element: boolean): boolean => element === false);
    if (isFormValid && this._form.checkValidity()) {
      this._formButton.removeAttribute('disabled');
    } else {
      this._formButton.setAttribute('disabled', '');
      return false;
    }
    return true;
  }

  // Проверка поля ввода на соответствие условиям паттерна
  private _validateInput(name: string, value: string, isValid: boolean): void {
    if (name === this._inputPasswordName) {
      this._passwordValues[name] = value;
    }

    if (name === 'password_repeat') {
      const isSamePassword: boolean = this._passwordValues[this._inputPasswordName] === value;
      Object.assign(this._inputValidity, { [name]: isSamePassword });
      return;
    }

    // Проверка соответствия поля ввода паттерну
    const pattern: RegExp = PATTERNS[`${name.toUpperCase()}_PATTERN`];
    // Если паттерн для поля ввода существует - проверяем значение на соответствие
    if (pattern) {
      Object.assign(this._inputValidity, { [name]: pattern.test(value) && isValid });
    } else {
      Object.assign(this._inputValidity, { [name]: isValid });
    }
  }

  // Обработчик изменения инпута
  public handleInputChange(evt: Event): void {
    const { name, value, validity } = (evt.target as HTMLInputElement);
    const isValid: boolean = validity.valid;
    this._validateInput(name, value, isValid);

    if (this._withTextError) {
      this._cleanError(evt);
    }

    if (this._withButton) {
      this._checkFromValid();
    }
  }

  public submitValidation() {
    this._inputs.forEach((input: HTMLInputElement) => {
      this._validateInput(input.name, input.value, input.validity.valid);
      if (!this._inputValidity[input.name]) {
        const label: HTMLLabelElement = input.closest('label')!;
        const error: HTMLSpanElement = label.querySelector(`.${this._inputErrorTextSelector}`)!;
        error.textContent = VALIDATION_ERRORS[`${input.name.toUpperCase()}_ERROR`];
        input.classList.add(this._inputErrorClass);
      }
    });
    return this._checkFromValid();
  }

  public getValidationState(): InputValidity {
    return this._inputValidity;
  }
}

export default FormValidator;
