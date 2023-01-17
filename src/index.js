import './index.css';
import Main from './components/Main/Main';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import ErrorPage from './components/ErrorPage/ErrorPage';
import {
  loginForm,
  registerForm,
  personalForm,
  passwordForm,
  userInfo,
} from './utils/constants';
import Profile from './components/Profile/Profile';

document.getElementById('root').innerHTML = Main();

/* document.getElementById('root').innerHTML = ErrorPage({
  title: '404',
  description: 'Вы попали в пустоту...',
  link: './chat',
  linkTitle: 'Вернуться к чату?',
}); */

//document.getElementById('root').innerHTML = Profile({ personalForm, passwordForm, userInfo });
/* document.getElementById('root').innerHTML = Login(loginForm); */
/* document.getElementById('root').innerHTML = Register(registerForm); */

/* document.querySelector('.form').addEventListener('submit', (evt) => {
  evt.preventDefault();
}) */

document.querySelector('.chat-controls__form').addEventListener('submit', (evt) => {
  evt.preventDefault();
});

document.querySelector('.search-form').addEventListener('submit', (evt) => {
  evt.preventDefault();
});

document.querySelector('.chat-controls__textarea').addEventListener('input', (evt) => {
  evt.target.style.height = 'auto';
  evt.target.style.height = evt.target.scrollHeight + 'px';
})

document.querySelector('.side-panel__button').addEventListener('click', () => {
  document.querySelector('.side-panel__content').classList.toggle('side-panel__content_shown');
  document.querySelector('.side-panel__button').classList.toggle('side-panel__button_action_close');
});

document.querySelector('.chat-controls__attach-btn').addEventListener('click', () => {
  document.querySelector('.popup-attach').classList.toggle('popup-attach_opened');
});

window.addEventListener('load', () => {
  document.querySelector('.chat-content__messages').scrollTo(0, document.querySelector('.chat-content__messages').scrollHeight);
});