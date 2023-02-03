import './App.css';
import template from './App.hbs';
import ErrorPage from '../ErrorPage/ErrorPage';
import Block from '../../services/Block';
import BasicRouter from '../../services/BasicRouter';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile';
import {
  loginForm,
  registerForm,
  addUserForm,
  personalForm,
  passwordForm,
} from '../../utils/formsContent';
import { chatData, chats } from '../../utils/chatsContent';
import { userId, userInfo } from '../../utils/userInfo';

type CallBackData = Record<string, FormDataEntryValue>;

class App extends Block {
  _router: BasicRouter;

  _history: Function;

  constructor() {
    super();

    this.children.page = this._pageToRender(window.location.pathname);
  }

  _handleLogin(data: CallBackData): void {
    console.warn('-----Login Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _handleRegister(data: CallBackData): void {
    console.warn('-----Register Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _handleSearch(data: CallBackData): void {
    console.warn('-----Search Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _addGroupUser(data: CallBackData): void {
    console.warn('-----Group Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _removeGroupUser(data: unknown): void {
    console.warn('-----Remove User Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _handleSendMessage(data: CallBackData): void {
    console.warn('-----Message Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _editProfile(data: CallBackData): void {
    console.warn('-----Edit Profile Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  _handleChangePassword(data: CallBackData): void {
    console.warn('-----Password Form-----');
    console.log(data);
    console.warn('--------------------');
  }

  // Изменение темы
  _changeTheme(evt: Event) {
    const target: HTMLDivElement = evt.target as HTMLDivElement;
    document.getElementById('root')!.classList.toggle('theme_dark');
    target.classList.toggle('profile__theme-change_theme_dark');
  }

  // Рендер страницы в зависимости от текущего пути
  _pageToRender(path: string): Block {
    let page: Block;
    switch (path) {
      case '/signin':
        page = new Login({
          loginForm,
          onLogin: this._handleLogin,
        });
        break;
      case '/signup':
        page = new Register({
          registerForm,
          onRegister: this._handleRegister,
        });
        break;
      case '/':
        page = new Chat({
          addUserForm,
          chats,
          chatData,
          userId,
          onSendMessage: this._handleSendMessage,
          onSearch: this._handleSearch,
          onAddUser: this._addGroupUser,
          onRemoveUser: this._removeGroupUser,
        });
        break;
      case '/profile':
        page = new Profile({
          personalForm,
          passwordForm,
          userInfo,
          events: [
            {
              selector: 'profile__theme-change',
              events: {
                click: this._changeTheme.bind(this),
              },
            },
          ],
          onEditProfile: this._editProfile,
        });
        break;
      default:
        page = new ErrorPage({
          title: '404',
          description: 'Вы попали в пустоту...',
          link: './',
          linkTitle: 'Вернуться к чату?',
        });
        break;
    }
    return page;
  }

  render() {
    return this.compile(template);
  }
}

export default App;
