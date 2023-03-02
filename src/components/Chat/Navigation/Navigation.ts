import './Navigation.css';
import template from './Navigation.hbs';
import Block from '../../../services/Block';
import FormValidator from '../../../services/FormValidator';
import Router from '../../../services/Router/Router';
import connect from '../../../services/Store/connect';
import SearchForm from './SearchForm/SearchForm';
import ChatList from './ChatList/ChatList';
import ChatInfo from './ChatInfo/ChatInfo';
import ProfileControl from './ProfileControl/ProfileControl';
import SearchResults from './SearchResults/SearchResults';
import isEqual from '../../../utils/isEqual';
import { PROFILE_URL } from '../../../utils/constants';
import {
  ChatType,
  EventType,
  State,
  UserType,
} from '../../../types/types';

type CallBack = (data: Record<string, FormDataEntryValue>) => void;

type Props = {
  chats: ChatType[],
  user: UserType,
  events?: EventType[],
  onSearch: CallBack,
  onSelectChat: CallBack,
  searchResults: CallBack,
  onCreateChat: CallBack,
};

class Navigation extends Block {
  private _validator: FormValidator;

  private _onSearch: CallBack;

  private _chatInfo: Block;

  private _chatList: Block;

  private _searchResults: Block;

  constructor(props: Props) {
    const {
      chats = [],
      user,
      searchResults = false,
      onSearch,
      onSelectChat,
      onCreateChat,
    } = props;
    super({
      chats, user, searchResults, onSelectChat, onCreateChat,
    });

    this._onSearch = onSearch;
    const navigationBody: Record<string, Block> = {};

    // Таймер для отслеживание прекращения ввода пользователя в строке поиска
    let timer: ReturnType<typeof setTimeout>;

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
            keyup: (evt) => {
              // Когда пользователь осуществляет ввод, сбрасываем таймер и устанавливаем новый
              clearTimeout(timer);
              timer = setTimeout(() => {
                // Осуществляем поиск по запросу пользователя через 750мс
                this._handleSearchFormSubmit(evt);
              }, 750);
            },
            keydown: () => {
              clearTimeout(timer);
            },
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
              new Router('.app').go(PROFILE_URL);
            },
          },
        },
      ],
    });

    this._chatInfo = new ChatInfo();

    this._chatList = new ChatList({
      onSelectChat: this.props.onSelectChat,
    });

    // Если массив с чатами пустой - показать заглушку
    if (this.props.chats.length === 0) {
      this.children.mainContainer = this._chatInfo;
    } else { // иначе отобразить список чатов
      this.children.mainContainer = this._chatList;
    }

    // Добавлени дочерних компонентов
    this.children.navigationBody = navigationBody;
  }

  // Подключение валидатора формы поиска после монтирования компонента
  _componentIsReady(): void {
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

  componentDidUpdate(oldProps: Props, newProps: Props) {
    if (isEqual(oldProps, newProps)) {
      return false;
    }

    // Если осуществлён поиск - отображаем компонент поиска
    if (this.props.searchResults) {
      if (!this._searchResults) {
        this._searchResults = new SearchResults({
          onSelectChat: this.props.onSelectChat,
          onCreateChat: this.props.onCreateChat,
        });
      }
      this.children.mainContainer = this._searchResults;
      return true;
    }

    // Если массив с чатами пустой - отображаем заглушку
    if (newProps.chats !== oldProps.chats) {
      if (newProps.chats && newProps.chats.length > 0) {
        this.children.mainContainer = this._chatList;
      } else {
        this.children.mainContainer = this._chatInfo;
      }
      return true;
    }

    return true;
  }

  // Обработчик инпута формы реадктирования профиля
  private _handleSearchInput(evt: Event) {
    this._validator.handleInputChange(evt); // надо ли?
  }

  // Обработчик формы поиска
  private _handleSearchFormSubmit(evt: Event) {
    evt.preventDefault();

    const target = evt.target as HTMLFormElement;
    const validationState = this._validator.getValidationState();
    const isFormValid: boolean = !Object.values(validationState)
      .some((state: boolean): boolean => state === false);

    if (isFormValid) {
      // Если тип события - Keydown, получаем ссылку на форму через target.form
      const data = target.form ? new FormData(target.form) : new FormData(target);
      const formData: Record<string, FormDataEntryValue> = Object.fromEntries(data.entries());

      // Коллбэк компонента App
      this._onSearch(formData);
    }
  }

  render(): DocumentFragment {
    return this.compile(template);
  }
}

function mapStateToProps(state: State) {
  return {
    chats: state.safe?.chats,
    user: state.user,
    searchResults: state.safe?.searchResults,
  };
}

export default connect(Navigation, mapStateToProps);
