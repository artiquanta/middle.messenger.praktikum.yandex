import './Register.css';
import template from './Register.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import FormValidator from '../../services/FormValidator';
import { FormType } from '../../utils/formsContent';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  registerForm: FormType,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onRegister: CallBack,
};

class Register extends Block {
  _onRegister: CallBack;

  _validator: FormValidator;

  constructor(props: Props) {
    const { registerForm, onRegister } = props;
    super();

    // Добавление компонента формы на страницу
    this.children.form = new Form({
      form: registerForm,
      // События для формы
      events: [
        {
          selector: 'form',
          events: {
            submit: this._handleForm.bind(this),
          },
        },
      ],
      // Коллбэк
      handleInput: this._handleInput.bind(this),
    });

    // Коллбэк с App
    this._onRegister = onRegister;
  }

  // Выполняется по событию из Block, когда компонент смонтирован
  componentIsReady() {
    this._validator = new FormValidator({
      options: {
        withButton: true,
        withTextError: true,
      },
      formData:
      {
        formName: 'registerForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
        inputPasswordName: 'password',
      },
    });
  }

  // Обработчик инпута
  _handleInput(evt: Event) {
    // Валидируем форму и поля, очищаем ошибку при начале ввода
    if (evt.type === 'input') {
      this._validator.handleInputChange(evt);
    }
    // Отображаем сообщение об ошибки, если требуется
    if (evt.type === 'blur') {
      this._validator.manageTextError(evt);
    }
  }

  // Обработчик формы
  _handleForm(evt: Event) {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this._onRegister(formData);
    }
  }

  // Рендер шаблона
  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Register;
