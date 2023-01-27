import './App.css';
import template from './App.hbs';
import ErrorPage from '../ErrorPage/ErrorPage'
import Block from '../../services/Block';
import Form from '../Form/Form'

type Props = {
  [key: string]: unknown
};

class App extends Block {
  constructor(props: Props) {
    super(props);
    this.children.pager = this.testFunction();
/*     this.children.errorPage = new ErrorPage({
      title: this.props.title,
      description: this.props.description,
      link: this.props.link,
      linkTitle: this.props.linkTitle,
      events: [
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
      ]
    }); */
    
  }

  testFunction() {
    const testArray = [1,2,3];
    return testArray.map((element) => {
      return new Form({});
    })
  }

    // Обновление пропса. Добавить проверка
    componentDidUpdate(oldProps: Props, newProps: Props): boolean {
/*       if (oldProps.title !== newProps.title) {
        this.children.pager.setProps({title: newProps.title});
      } */
/*       Object.keys(oldProps).forEach(prop => {
        if (oldProps[prop] !== newProps[prop]) {
          this.children.errorPage.setProps({ title: newProps[prop] });
        }
      }); */
  
      return true;
    }

  // Как один из вариантов реализации обработки формы
  handleForm(evt: Event): void {
    evt.preventDefault();
  }

  // Рендер текущего шаблона
  render(): DocumentFragment {
    return this.compile(template);
  }
}

export default App;



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