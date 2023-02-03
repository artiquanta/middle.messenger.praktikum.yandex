import './Navigation.css';
import template from './Navigation.hbs';
import Block from '../../../services/Block';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ChatInfo from './ChatInfo/ChatInfo';
import ProfileControl from './ProfileControl/ProfileControl';
import FormValidator from '../../../services/FormValidator';
import { ChatsType } from '../../../utils/chatsContent';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  chats: ChatsType,
  userId: number,
  events?: {
    selector: string;
    events: Record<string, (evt: Event) => void>,
  }[],
  onSearch: CallBack,
};

class Navigation extends Block {
  _validator: FormValidator;

  _onSearch: CallBack;

  constructor(props: Props) {
    const { chats, userId, onSearch } = props;
    super();

    this._onSearch = onSearch;
    const navigationBody: Record<string, Block> = {};

    // Форма поиска нужных чатов или контактов
    navigationBody.searchForm = new SearchForm({
      events: [
        {
          selector: 'search-form',
          events: {
            submit: this._handleSearchFormSubmit.bind(this),
          },
        },
        {
          selector: 'search-form__input',
          events: {
            input: this._handleSearchInput.bind(this),
          },
        },
      ],
    });

    // Блок с кнопкой управления профиля
    navigationBody.profileControl = new ProfileControl({
      buttonTitle: 'Управление профилем',
      events: [
        {
          selector: 'profile-control__button',
          events: {
            click: () => {
              window.location.href = './profile';
            },
          },
        },
      ],
    });

    // Если массив с чатами пустой - показать заглушку
    if (chats.length === 0) {
      navigationBody.chatsList = new ChatInfo();
    } else { // иначе отобразить список чатов
      navigationBody.chatsList = new ChatList({ chats, userId });
    }

    // Добавлени дочерних компонентов
    this.children.navigationBody = navigationBody;
  }

  // Подключение валидатора формы поиска после монтирования компонента
  componentIsReady(): void {
    this._validator = new FormValidator({
      options: {
        withButton: false,
        withTextError: false,
      },
      formData:
      {
        formName: 'searchForm',
        inputErrorClass: 'search-form__input_type_error',
      },
    });
  }

  // Обработчик инпута формы реадктирования профиля
  _handleSearchInput(evt: Event) {
    this._validator.handleInputChange(evt);
  }

  // Обработчик формы поиска
  _handleSearchFormSubmit(evt: Event) {
    evt.preventDefault();
    const target = evt.target as HTMLFormElement;
    // Повторная проверка валидации формы
    const validationState = this._validator.getValidationState();
    const isFormValid: boolean = !Object.values(validationState)
      .some((state: boolean): boolean => state === false);
    if (isFormValid) {
      const data = new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк основного компонента App
      this._onSearch(formData);
    }
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default Navigation;
