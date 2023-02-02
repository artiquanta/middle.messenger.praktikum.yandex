import './App.css';
import template from './App.hbs';
import ErrorPage from '../ErrorPage/ErrorPage'
import Block from '../../services/Block';
import Form from '../Form/Form'
import BasicRouter from '../../services/BasicRouter';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Chat from '../Chat/Chat';
import Profile from '../Profile/Profile'
import { loginForm, registerForm, addUserForm, personalForm, passwordForm } from '../../utils/formsContent';
import { chatData, chats } from '../../utils/chatsContent';
import { userId, userInfo } from '../../utils/userInfo';

type Props = {
  [key: string]: unknown
};

enum PAGES {
}

class App extends Block {
  _router: BasicRouter;
  _history: Function;

  constructor() {
    super();

    this.children.page = this._pageToRender(window.location.pathname);
    this._router = new BasicRouter('app', ['/signin', '/signup', '/profile', '/'], ErrorPage, this.changPage);
  }

  login(data) {
    console.log(data);
  }

  register(data) {
    console.log(data);
  }

  changPage(path) {
    console.log(path)
  }

  _pageToRender(path: string): Block {
    let page: Block;
    switch (path) {
      case '/signin':
        page = new Login({
          loginForm,
          onLogin: this.login,
          history: this.changPage,
        });
        break;
      case '/signup':
        page = new Register({
          registerForm,
          onRegister: this.register,
        });
        break;
      case '/':
        page = new Chat({
          addUserForm,
          chats,
          chatData,
          userId,
        });
        break;
      case '/profile':
        page = new Profile({ personalForm, passwordForm, userInfo });
        break;
      default:
        page = new ErrorPage();
        break;
    }
    return page;
  }

  render() {
    return this.compile(template);
  }
}















/* class App extends Block {
  constructor(props: Props) {
    super(props);    
  }

/*   testFunction() {
    const testArray = [1,2,3];
    return testArray.map((element) => {
      return new Form({});
    })
  } */

// Обновление пропса. Добавить проверка
//componentDidUpdate(oldProps: Props, newProps: Props): boolean {
/*       if (oldProps.title !== newProps.title) {
        this.children.pager.setProps({title: newProps.title});
      } */
/*       Object.keys(oldProps).forEach(prop => {
        if (oldProps[prop] !== newProps[prop]) {
          this.children.errorPage.setProps({ title: newProps[prop] });
        }
      }); */

/*       return true;
    } */

// Как один из вариантов реализации обработки формы
/*   handleForm(evt: Event): void {
    evt.preventDefault();
  } */

// Рендер текущего шаблона
/*   render(): DocumentFragment {
    return this.compile(template);
  } */
//}

export default App;

/* events: [
  {
    selector: 'error-page__return-link',
    events: {
      click: this.handleForm.bind(this),
    }
  },
  {
    selector: 'error-page__title',
    events: {
      click: (evt: Event) => {
        evt.preventDefault();
      },
    }
  }
] */

/* import Login from '../Login/Login';
import Regiser from '../Register/Register';
import Profile from '../Profile/Profile';
import Chat from '../Chat/Chat';


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
      currentPage = new ErrorPage({
        title: '404',
        description: 'Вы попали в пустоту...',
        link: './',
        linkTitle: 'Вернуться к чату?',
      }).getContent();
  };
  console.log(template({
    page: currentPage,
  }))

  return template({
    page: currentPage,
  });
}

export default App;
 */