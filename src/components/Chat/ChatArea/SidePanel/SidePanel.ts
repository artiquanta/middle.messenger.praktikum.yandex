import './SidePanel.css';
import template from './SidePanel.hbs';
import Block from '../../../../services/Block';
import FormValidator from '../../../../services/FormValidator';
import connect from '../../../../services/Store/connect';
import Form from '../../../Form/Form';
import GroupUsersList from './GroupUsersList/GroupUsersList';
import { addUserForm } from '../../../../utils/formsContent';
import {
  CallBack,
  EventType,
  State,
  UserType,
} from '../../../../types/types';

type Props = {
  user: UserType,
  chatOwnerId: number,
  events: EventType[],
  onAddUser: CallBack,
  onRemoveUser: CallBack,
};

class SidePanel extends Block {
  private _validator: FormValidator;

  constructor(props: Props) {
    const {
      user,
      chatOwnerId,
      events,
      onAddUser,
      onRemoveUser,
    } = props;

    super({
      events,
      user,
      chatOwnerId,
      onAddUser,
    });

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

    // добавляем действующих участников чата
    sidePanelBody.usersList = new GroupUsersList({ onRemoveUser });

    // Добавление дочерних компонетов
    this.children.sidePanelBody = sidePanelBody;
  }

  // Подключение валидатора после монтирования компонента
  _componentIsReady(): void {
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

  private _handleInput(evt: Event): void {
    // Валидируем форму и поля, очищаем ошибку при начале ввода
    if (evt.type === 'input') {
      this._validator.handleInputChange(evt);
    }
    // Отображаем сообщение об ошибки, если требуется
    if (evt.type === 'blur') {
      this._validator.manageTextError(evt);
    }
  }

  private _handleFormSubmit(evt: Event): void {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const isFormValid: boolean = this._validator.submitValidation();
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк компонента App
      this.props.onAddUser(formData);

      // Очистка содержимого формы
      target.reset();
    }
  }

  render(): DocumentFragment {
    return this.compile(template, {
      chatOwner: this.props.chatOwnerId === this.props.user.id,
    });
  }
}

function mapStateToProps(state: State) {
  return {
    user: state.user,
    chatOwnerId: state.safe?.chatOwnerId,
  };
}

export default connect(SidePanel, mapStateToProps);
