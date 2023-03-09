import './App.css';
import template from './App.hbs';
import Block from '../../services/Block/Block';
import Router from '../../services/Router/Router';
import Store from '../../services/Store/Store';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';
import ErrorPage from '../ErrorPage/ErrorPage';
import Loader from '../Loader/Loader';
import UserController from '../../controllers/UserController';
import MainController from '../../controllers/MainController';
import ChatController from '../../controllers/ChatController';
import SearchController from '../../controllers/SearchController';
import ProfileController from '../../controllers/ProfileController';
import {
  MESSENGER_URL,
  PROFILE_URL,
  SIGNIN_URL,
  SIGNUP_URL,
} from '../../utils/constants';
import ErrorMessages from '../../utils/errorMessages';
import {
  AddUserType,
  ChangePasswordType,
  ErrorType,
  LoginFormDataType,
  RegisterFormDataType,
  SearchDataType,
  SendMessageType,
  UpdateProfileType,
} from '../../types/types';

class App extends Block {
  private _userId: number | null;

  private _router: Router;

  private _isLoggedIn: boolean = false;

  private _isProcessing: boolean = false;

  private _userController: UserController;

  private _mainController: MainController;

  private _chatController: ChatController | null;

  private _searchController: SearchController;

  private _profileController: ProfileController | null;

  constructor() {
    super();

    this._userController = new UserController();

    this._mainController = new MainController();

    this.children.loader = new Loader({});
  }

  async _componentIsReady() {
    await Promise.all([
      this._checkAuth(),
      this._mainController.initialFilling(),
      this._registerRoutes(),
    ]);
    this._router.start();
  }

  // Подключение роутера
  _registerRoutes() {
    this._router = new Router('.app');
    this._router
      .use(SIGNIN_URL, Login, {
        checkLoggedIn: this._initalizeUnprotectedPage.bind(this),
        onLogin: this._handleLogin.bind(this),
      })
      .use(SIGNUP_URL, Register, {
        checkLoggedIn: this._initalizeUnprotectedPage.bind(this),
        onRegister: this._handleRegister.bind(this),
      })
      .use(MESSENGER_URL, Chat, {
        initializePage: this._initializeChatPage.bind(this),
        unmountPage: this._handleUnmountChatPage.bind(this),
        onSendMessage: this._handleSendMessage.bind(this),
        onSearch: this._handleSearch.bind(this),
        onAddUser: this._addGroupUser.bind(this),
        onRemoveUser: this._removeGroupUser.bind(this),
        onSelectChat: this._openChat.bind(this),
        onDeleteChat: this._handleChatDelete.bind(this),
        onCreateChat: this._createChat.bind(this),
        onGetMessages: this._getMessages.bind(this),
      })
      .use(PROFILE_URL, Profile, {
        checkLoggedIn: this._initalizeProtectedPage.bind(this),
        events: [
          {
            selector: 'profile__theme-change',
            events: {
              click: this._changeTheme.bind(this),
            },
          },
          {
            selector: 'profile__return-link',
            events: {
              click: (evt: Event) => {
                evt.preventDefault();
                this._router.go(MESSENGER_URL);
              },
            },
          },
          {
            selector: 'profile__logout-button',
            events: {
              click: this._handleLogout.bind(this),
            },
          },
        ],
        onEditProfile: this._editProfile,
        onChangePassword: this._handleChangePassword.bind(this),
        onChangeAvatar: this._handleChangeAvatar.bind(this),
      })
      .use('/*', ErrorPage, {
        title: '404',
        description: 'Вы попали в пустоту...',
        link: MESSENGER_URL,
        linkTitle: 'Вернуться к чату?',
      });
  }

  // Проверяем, авторизован ли пользователь
  async _checkAuth() {
    try {
      this._isProcessing = true;
      const id = await this._userController.getCurrentUser();

      if (id) {
        this._userId = id;
      }
      if (this._userId) {
        this._isLoggedIn = true;
      }
      this._isProcessing = false;
    } catch (err) {
      this._isProcessing = false;
    }
  }

  // Обработчик незащищённых страниц
  _initalizeUnprotectedPage() {
    if (this._isLoggedIn) {
      new Router('.app').go(MESSENGER_URL);
      return true;
    }

    return false;
  }

  // Обработчик защищённых страниц
  _initalizeProtectedPage() {
    if (!this._isLoggedIn) {
      new Router('.app').go(SIGNIN_URL);
      return false;
    }

    return true;
  }

  // Инициализация страницы чата
  async _initializeChatPage() {
    Store.set('safe.isProcessing', true);
    // Ожидание завершения процесса аутентификации пользователя
    if (this._isProcessing) {
      setTimeout(() => { this._initializeChatPage(); }, 500);
      return;
    }

    // Если пользователь авторизован, отображаем страницу чата
    if (this._isLoggedIn) {
      // Создаём экземпляр контроллера чата, если ранее он не был создан
      if (!this._chatController) {
        this._chatController = new ChatController(this._userId!);
      }
      await this._chatController.getChats();
      const firstChat = this._chatController.getFirstChat();
      if (firstChat) {
        this._chatController.openChat(firstChat.id);
      } else {
        Store.set('safe.isProcessing', false);
      }
      // иначе переводим его на страницу входа
    } else {
      new Router('.app').go(SIGNIN_URL);
      Store.set('safe.isProcessing', false);
    }
  }

  // Обработчик размонтирования страницы чата
  _handleUnmountChatPage() {
    if (this._chatController) {
      // Закрытие WSS
      this._chatController.closeSocketSoft();
    }
  }

  /* Обработчики форм */
  // Обработчик формы входа
  async _handleLogin(data: LoginFormDataType): Promise<void> {
    Store.set('safe.formError', '');
    this._isProcessing = true;
    Store.set('safe.isProcessing', true);
    await this._userController.login(data)
      .then((res) => {
        if (typeof res === 'number') {
          this._userId = res;
        }
      })
      .then(() => {
        this._isLoggedIn = true;
        this._isProcessing = false;
        this._router.go(MESSENGER_URL);
      })
      .catch((err) => {
        this._isProcessing = false;
        if (err.response) {
          Store.set('safe.formError', ErrorMessages.INCORRECT_LOGIN_DATA);
        } else {
          Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
        }
        Store.set('safe.isProcessing', false);
      });
  }

  // Обработчик формы регистрации
  async _handleRegister(data: RegisterFormDataType): Promise<void> {
    try {
      await this._userController.register(data);
      this._handleLogin(data);
    } catch (err) {
      const error = err as ErrorType;
      if (error.response) {
        Store.set('safe.formError', error.response.reason);
      } else {
        Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
      }
    }
  }

  // Выход из системы
  async _handleLogout() {
    Store.set('safe.isProcessing', true);
    await this._userController.logout()
      .then(() => {
        if (this._chatController) {
          this._chatController.closeSocket();
        }
        this._isLoggedIn = false;
        this._userId = null;
        this._isProcessing = false;
        this._chatController = null;
        this._profileController = null;
        new Router('app').go(SIGNIN_URL);
      })
      .catch((err) => {
        if (err.response) {
          console.log(ErrorMessages.LOGOUT_ERROR, err.response.reason);
        } else {
          console.log(ErrorMessages.BAD_RESPONSE);
        }
      });
  }

  // Создание чата
  async _createChat(userId: number) {
    this._chatController!.createChat(userId);
  }

  // Удаление чата
  async _handleChatDelete() {
    this._chatController!.deleteChat();
  }

  // Добавление пользователя в чат
  async _addGroupUser(data: AddUserType): Promise<void> {
    Store.set('safe.formError', '');
    await this._chatController!.addGroupUser(data);
  }

  // Удаление пользователя из чата
  _removeGroupUser(userId: number): void {
    this._chatController!.removeGroupUser(userId);
  }

  // Открытие чата
  _openChat(chatId: number) {
    this._chatController!.openChat(chatId);
  }

  // Получение списка сообщений
  _getMessages() {
    this._chatController!.getMoreMessage();
  }

  // Отправка сообщения
  _handleSendMessage(data: SendMessageType): void {
    this._chatController!.sendMessage(data);
  }

  // Обработчик формы поиска
  async _handleSearch(data: SearchDataType): Promise<void> {
    if (!this._searchController) {
      this._searchController = new SearchController();
    }

    this._searchController.search(data);
  }

  // Редактирование профиля
  _editProfile(data: UpdateProfileType): void {
    if (!this._profileController) {
      this._profileController = new ProfileController();
    }
    Store.set('safe.formError', '');
    this._profileController.updateProfile(data)
      .catch((err) => {
        if (err.response) {
          Store.set('safe.formError', ErrorMessages.BAD_DATA);
        } else {
          Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
        }
      });
  }

  // Изменение пароля пользователя
  _handleChangePassword(data: ChangePasswordType): void {
    if (!this._profileController) {
      this._profileController = new ProfileController();
    }

    Store.set('safe.formError', '');
    if (data.oldPassword === data.newPassword) {
      return;
    }
    this._profileController.changePassword(data)
      .catch((err) => {
        if (err.response) {
          Store.set('safe.formError', err.response.reason);
        } else {
          Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
        }
      });
  }

  // Изменение аватара пользовател
  _handleChangeAvatar(data: FormData) {
    if (!this._profileController) {
      this._profileController = new ProfileController();
    }

    Store.set('safe.formError', '');
    this._profileController.updateAvatar(data)
      .catch((err) => {
        if (err.response) {
          Store.set('safe.formError', err.response.reason);
        } else {
          Store.set('safe.formError', ErrorMessages.BAD_RESPONSE);
        }
      });
  }

  // Изменение темы
  _changeTheme(evt: Event) {
    this._mainController.changeTheme(evt);
  }

  render() {
    return this.compile(template);
  }
}

export default App;
