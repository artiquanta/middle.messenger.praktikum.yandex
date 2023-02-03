import './SidePanel.css';
import template from './SidePanel.hbs';
import Block from '../../../../services/Block';
import GroupUser from './GroupUser/GroupUser';
import Form from '../../../Form/Form';
import { FormType } from '../../../../utils/formsContent';
import FormValidator from '../../../../services/FormValidator';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  groupUsers: {
    name: string,
    avatar: string,
    id: number,
  }[],
  groupOwner: number,
  addUserForm: FormType,
  events: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onAddUser: CallBack,
  onRemoveUser: (data: unknown) => void,
};

class SidePanel extends Block {
  _onAddUser: CallBack;

  _onRemoveUser: (data: unknown) => void;

  _validator: FormValidator;

  constructor(props: Props) {
    const {
      addUserForm,
      groupUsers,
      groupOwner,
      events,
      onAddUser,
      onRemoveUser,
    } = props;
    super({ events });

    this._onAddUser = onAddUser;
    this._onRemoveUser = onRemoveUser;

    const sidePanelBody: Record<string, Block | Block[]> = {};

    // Форма добавление пользователя в чат (создание группового чата)
    sidePanelBody.form = new Form({
      form: addUserForm,
      events: [
        {
          selector: 'form',
          events: {
            submit: this._handleFormSubmit.bind(this),
          },
        },
      ],
      handleInput: this._handleInput.bind(this),
    });

    // Если тип чата - групповой чат, добавляем список пользователей группы.
    // Иначе добавляем действующих участников чата
    sidePanelBody.usersList = groupUsers.map((user) => new GroupUser({
      user,
      groupOwner,
      events: [
        {
          selector: 'group-user__remove-user',
          events: {
            click: this._handleRemoveUser.bind(this),
          },
        },
      ],
    }));

    // Добавление дочерних компонетов
    this.children.sidePanelBody = sidePanelBody;
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
        formName: 'addUserForm',
        buttonSelector: 'form__button',
        inputErrorTextSelector: 'form-input__error',
        inputErrorClass: 'form-input__input_type_error',
        inputPasswordName: 'password',
      },
    });
  }

  _handleInput(evt: Event): void {
    // Валидируем форму и поля, очищаем ошибку при начале ввода
    if (evt.type === 'input') {
      this._validator.handleInputChange(evt);
    }
    // Отображаем сообщение об ошибки, если требуется
    if (evt.type === 'blur') {
      this._validator.manageTextError(evt);
    }
  }

  _handleFormSubmit(evt: Event): void {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк компонента App
      this._onAddUser(formData);

      // Очистка содержимого формы
      target.reset();
    }
  }

  _handleRemoveUser(evt: Event) {
    this._onRemoveUser(evt);
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default SidePanel;
