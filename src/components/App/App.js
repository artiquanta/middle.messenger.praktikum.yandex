import './App.css';
import template from './App.hbs';
import Login from '../Login/Login';
import Regiser from '../Register/Register';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';
import ErrorPage from '../ErrorPage/ErrorPage'

// Импорт данных для временного наполнения
import {

} from '../../utils/constants';

import {
  loginForm,
  registerForm,
  addUserForm,
  personalForm,
  passwordForm,
} from '../../utils/formsContent';

import { chats, chatData } from '../../utils/chatsContent';

import { userId, userInfo } from '../../utils/userInfo';

function App(path) {
  let currentPage;
  const pathname = path ? path : window.location.pathname;

  switch (pathname) {
    case '/':
      currentPage = Chat(chatData, chats, addUserForm);
      break;
    case '/signin':
      currentPage = Login(loginForm);
      break;
    case '/signup':
      currentPage = Regiser(registerForm);
      break;
    case '/profile':
      currentPage = Profile(personalForm, passwordForm, userInfo);
      break;
    default:
      currentPage = ErrorPage({
        title: '404',
        description: 'Вы попали в пустоту...',
        link: './',
        linkTitle: 'Вернуться к чату?',
      });
  };

  return template({
    page: currentPage,
  });
}

export default App;
