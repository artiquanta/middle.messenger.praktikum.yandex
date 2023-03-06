import './Profile.css';
import template from './Profile.hbs';
import Block from '../../services/Block';
import Form from '../Form/Form';
import Avatar from './Avatar/Avatar';
import FormValidator from '../../services/FormValidator';
import { passwordForm, personalForm } from '../../utils/formsContent';
import connect from '../../services/Store/connect';
import { MESSENGER_URL } from '../../utils/constants';
import { CallBack, Indexed, UserType } from '../../types/types';

type Props = {
  user: UserType,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  checkLoggedIn: CallBack,
  onEditProfile: CallBack,
  onChangePassword: CallBack,
  onChangeAvatar: CallBack,
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
  private _validatorPersonal: FormValidator;

  private _validatorPassword: FormValidator;

  constructor(props: Props) {
    const {
      user,
      events,
      checkLoggedIn,
      onEditProfile,
      onChangePassword,
      onChangeAvatar,
    } = props;
    super({
      user,
      events,
      checkLoggedIn,
      onEditProfile,
      onChangePassword,
      onChangeAvatar,
    });

    const profileBody: Record<string, Block> = {};

    profileBody.avatar = new Avatar({
      events: [
        {
          selector: 'avatar',
          events: {
            submit: this._handleChangeAvatar.bind(this),
          },
        },
        {
          selector: 'avatar__label',
          events: {
            dragover: (evt: Event) => {
              evt.preventDefault();
            },
            dragenter: (evt: Event) => {
              evt.preventDefault();
            },
            drop: this._handleChangeAvatar.bind(this),
          },
        },
        {
          selector: 'avatar__upload-input',
          events: {
            change: this._handleChangeAvatar.bind(this),
          },
        },
      ],
    });

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
      handleInput: this._handlePersonalInput.bind(this),
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
      handleInput: this._handlePasswordInput.bind(this),
    });

    // Добавление доченрних компонентов в родительский
    this.children.profileBody = profileBody;
  }

  componentDidMount() {
    this.props.checkLoggedIn();
  }

  // Подключение валидации форм, заполнение формы персональными данными пользователя
  _componentIsReady(): void {
    if (this.props.checkLoggedIn()) {
      const formElement = document.getElementById('personalForm')!;
      const inputs = formElement.querySelectorAll('input');
      const { user } = this.props as Props;
      // Заполнение формы данными пользователя
      inputs.forEach((input: HTMLInputElement): void => {
        /* eslint no-param-reassign: "error" */
        const inputName = input.name as keyof User;
        input.value = user[inputName]!.toString();
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
  }

  // Обработчик инпута формы реадктирования профиля
  private _handlePersonalInput(evt: Event) {
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
  private _handlePasswordInput(evt: Event) {
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
  private _handlePersonalForm(evt: Event): void {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validatorPersonal.submitValidation();
    // Если форма валидна - обрабатываем значения
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());
      const isDifferentData = Object.entries(formData)
        .some(([key, value]) => value !== this.props.user[key]);
      // Коллбэк основного компонента App
      if (isDifferentData) {
        this.props.onEditProfile(formData);
      }
    }
  }

  // Обработчик формы изменения пароля
  private _handlePasswordForm(evt: Event): void {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validatorPassword.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());
      this.props.onChangePassword(formData);
      target.reset();
      // Коллбэк основного компонента App
    }
  }

  private _handleChangeAvatar(evt: InputEvent | DragEvent) {
    evt.preventDefault();
    let file: File | null = null;
    switch (evt.type) {
      case 'drop': {
        const { dataTransfer } = evt as DragEvent;
        [file] = dataTransfer!.files;
      }
        break;
      case 'change': {
        const target = evt.target as HTMLFormElement;
        [file] = target.files;
      }
        break;
      default:
        break;
    }

    if (file) {
      const form = new FormData();
      form.append('avatar', file);
      this.props.onChangeAvatar(form);
    }
  }

  render(): DocumentFragment {
    return this.compile(template, {
      returnLink: MESSENGER_URL,
    });
  }
}

function mapSateToProps(state: Indexed) {
  return {
    user: state.user,
  };
}

export default connect(Profile, mapSateToProps);
