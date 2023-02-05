import './Login.css';
import template from './Login.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import FormValidator from '../../services/FormValidator';
import { FormType } from '../../utils/formsContent';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  loginForm: FormType,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onLogin: CallBack,
};

class Login extends Block {
  _onLogin: CallBack;

  _validator: FormValidator;

  constructor(props: Props) {
    const { loginForm, onLogin } = props;
    super();

    this.children.form = new Form({
      form: loginForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this.handleForm.bind(this),
          },
        },
      ],
      // Коллбэк обработки инпута
      handleInput: this.handleInput.bind(this),
    });

    // Коллбэк компонента App
    this._onLogin = onLogin;
  }

  // Подключение валидатора после монтирования компонента
  componentIsReady(): void {
    this._validator = new FormValidator({
      options: {
        withButton: true,
        withTextError: true,
      },
      formData:
      {
        formName: 'loginForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
      },
    });
  }

  // Обработчик инпута
  handleInput(evt: Event): void {
    switch (evt.type) {
      case 'input':
        this._validator.handleInputChange(evt);
        break;
      case 'blur':
        this._validator.manageTextError(evt);
        break;
      default:
        break;
    }
  }

  // Обработчик формы
  handleForm(evt: Event): void {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this._onLogin(formData);
    }
  }

  render() {
    return this.compile(template);
  }
}

export default Login;
