import './Login.css';
import template from './Login.hbs';
import Block from '../../services/Block/Block';
import Form from '../Form/Form';
import FormValidator from '../../services/FormValidator/FormValidator';
import Router from '../../services/Router/Router';
import { loginForm } from '../../utils/formsContent';
import { SIGNUP_URL } from '../../utils/constants';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onLogin: CallBack,
  checkLoggedIn: CallBack,
};

class Login extends Block {
  private _validator: FormValidator;

  constructor(props: Props) {
    super(props);

    this.children.form = new Form({
      form: loginForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this._handleForm.bind(this),
          },
        },
        {
          selector: 'form__link',
          events: {
            click: (evt: Event) => {
              evt.preventDefault();
              Router.getInstance().go(SIGNUP_URL);
            },
          },
        },
      ],
      // Коллбэк обработки инпута
      handleInput: this._handleInput.bind(this),
    });
  }

  // Подключение валидатора после монтирования компонента
  _componentIsReady(): void {
    if (this.props.checkLoggedIn()) {
      return;
    }

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
  private _handleInput(evt: Event): void {
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
  private _handleForm(evt: Event): void {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this.props.onLogin(formData);
    }
  }

  render() {
    return this.compile(template);
  }
}

export default Login;
