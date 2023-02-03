import './Profile.css';
import template from './Profile.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import FormValidator from '../../services/FormValidator';
import { FormType } from '../../utils/formsContent';
import { UserInfo } from '../../utils/userInfo';

type Props = {
  personalForm: FormType,
  passwordForm: FormType,
  userInfo: UserInfo,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onEditProfile: (data: Record<string, FormDataEntryValue>) => void,
};

type User = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
};

class Profile extends Block {
  _validatorPersonal: FormValidator;

  _validatorPassword: FormValidator;

  _onEditProfile;

  constructor(props: Props) {
    const {
      personalForm,
      passwordForm,
      userInfo,
      events,
      onEditProfile,
    } = props;
    super({ userInfo, events });
    const profileBody: Record<string, Block> = {};

    // Форма редактирования профиля пользователя
    profileBody.personalForm = new Form({
      form: personalForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this._handlePersonalForm.bind(this),
          },
        },
      ],
      // Коллбэк обработки инпута
      handleInput: this.handlePersonalInput.bind(this),
    });

    // Форма изменения пароля пользователя
    profileBody.passwordForm = new Form({
      form: passwordForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this._handlePasswordForm.bind(this),
          },
        },
      ],
      // Коллбэк обработки инпута
      handleInput: this.handlePasswordInput.bind(this),
    });

    // Добавление доченрних компонентов в родительский
    this.children.profileBody = profileBody;
    this._onEditProfile = onEditProfile;
  }

  // Подключение валидации форм, заполнение формы персональными данными пользователя
  componentIsReady(): void {
    const personalForm = document.getElementById('personalForm')!;
    const inputs = personalForm.querySelectorAll('input');
    const { user } = this.props.userInfo as UserInfo;
    // Заполнение формы данными пользователя
    inputs.forEach((input: HTMLInputElement): void => {
      /* eslint no-param-reassign: "error" */
      const inputName = input.name as keyof User;
      input.value = user[inputName].toString();
    });

    // Валидация для формы редактирования профиля
    this._validatorPersonal = new FormValidator({
      options: {
        withButton: true,
        withTextError: true,
      },
      formData:
      {
        formName: 'personalForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
      },

    });

    // Валидация для формы изменения пароля
    this._validatorPassword = new FormValidator({
      options: {
        withButton: true,
        withTextError: true,
      },
      formData:
      {
        formName: 'passwordForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
        inputPasswordName: 'newPassword',
      },

    });
  }

  // Обработчик инпута формы реадктирования профиля
  handlePersonalInput(evt: Event) {
    switch (evt.type) {
      case 'input':
        this._validatorPersonal.handleInputChange(evt);
        break;
      case 'blur':
        this._validatorPersonal.manageTextError(evt);
        break;
      default:
        break;
    }
  }

  // Обработчик инпута формы реадктирования профиля
  handlePasswordInput(evt: Event) {
    switch (evt.type) {
      case 'input':
        this._validatorPassword.handleInputChange(evt);
        break;
      case 'blur':
        this._validatorPassword.manageTextError(evt);
        break;
      default:
        break;
    }
  }

  // Обработчик формы редактирования профиля
  _handlePersonalForm(evt: Event): void {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validatorPersonal.submitValidation();
    // Если форма валидна - обрабатываем значения
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this._onEditProfile(formData);
    }
  }

  // Обработчик формы изменения пароля
  _handlePasswordForm(evt: Event): void {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validatorPassword.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this._onEditProfile(formData);
    }
  }

  render(): DocumentFragment {
    return this.compile(template, {
      user: this.props.userInfo,
    });
  }
}

export default Profile;
