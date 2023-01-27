import './index.css';
import App from './components/App/App';
import ErrorPage from './components/ErrorPage/ErrorPage';

const root = document.getElementById('root');

// Отрисовка страницы в зависимости от пути
function renderPage(path) {
  const pagePath = path ? path : window.location.pathname;
  /* root.appendChild(App(path)); */
  const test = new App({
    title: '404',
    description: 'Вы попали в пустоту...',
    link: './',
    linkTitle: 'Вернуться к чату?',
  });
  //console.log(test.getContent())
  //test.setProps({title: 'Кукарача', description: 'asd'})
  root.appendChild(test.getContent());
 // console.log(test.getContent())
  test.componentDidMount();
  //setTimeout(() => {test.setProps({title: 'Кукарача1'})}, 1000);
  // setTimeout(() => {test.setProps({title: 'Кукарача2'}), root.innerHTML = ''; root.appendChild(test.getContent())}, 5000);

  //setFormEventListener();
  //setPageEventListener(pagePath);
}


// Временное наполнение обработчиками событий

// Смена страницы
function changePage(path) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new Event('popstate'));
}

// Обработчик форм
function handleForm(evt) {
  evt.preventDefault();
}

// Добавление обработчиков на формы
function setFormEventListener() {
  const forms = document.querySelectorAll('.form');

  forms.forEach((form) => {
    form.addEventListener('submit', handleForm);
  });
}

// Наполнение страницы обработчиками событий
function setPageEventListener(path) {
  if (path === '/') {
    // Прокрутка чата с сообщениями вниз после загрузки страницы
    const messageContainer = document.querySelector('.chat-content__messages');
    window.addEventListener('load', () => {
      messageContainer.scrollTo(0, messageContainer.scrollHeight);
    });

    // Обработчик клика по кнопки "Управление профилем"
    document.querySelector('.profile-control__button').addEventListener('click', () => {
      changePage('profile');
    });

    // Обработчиков выделения карточки чата по клику в меню навигации
    const chatCards = document.querySelectorAll('.chat-card');
    chatCards.forEach((card) => {
      card.addEventListener('click', () => {
        card.classList.toggle('chat-card_selected');
      });
    });

    // Обработчик выбора сообщений пользователя в чате для удаления
    const userMessages = document.querySelectorAll('.message_type_user');
    userMessages.forEach((message) => {
      message.addEventListener('click', (evt) => {
        evt.preventDefault();
        evt.target.closest('.message__container').classList.toggle('message__container_selected');
      });
    });

    // Измение высоты поля ввода сообщения (textarea) под контент
    document.querySelector('.chat-controls__textarea').addEventListener('input', (evt) => {
      evt.target.style.height = 'auto';
      evt.target.style.height = evt.target.scrollHeight + 'px';
    });

    // Обработчик открытия бокового меню по клику
    const button = document.querySelector('.side-panel__button');
    button.addEventListener('click', () => {
      document.querySelector('.side-panel__content').classList.toggle('side-panel__content_shown');
      button.classList.toggle('side-panel__button_action_close');
    });

    // Обработчик вызова модального окна прикрепления данных к сообщению
    document.querySelector('.chat-controls__attach-btn').addEventListener('click', () => {
      document.querySelector('.popup-attach').classList.toggle('popup-attach_opened');
    });

    // Добавление обработчиков всем формам на странице
    setFormEventListener();
  }

  if (path === '/profile') {
    // Обработчик изменения цветовой темы
    document.querySelector('.profile__theme-change').addEventListener('click', () => {
      document.querySelector('.root').classList.toggle('theme_dark');
    });

    // Обработчик возврата на страницу с чатом
    document.querySelector('.profile__return-url').addEventListener('click', (evt) => {
      evt.preventDefault();
      changePage('/');
    });

    // Добавление обработчиков всем формам на странице
    setFormEventListener();
  }

  if (path === '/signin') {
    // Обработчик формы с переадресацией на страницу чата
    const form = document.querySelector('.form');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      changePage('/');
    });

    // Обработчик ссылки в форме с переадресацией на страницу авторизации
    form.querySelector('.form__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      changePage('./signup');
    });
  }

  if (path === '/signup') {
    // Обработчик формы с переадресацией на страницу чата
    const form = document.querySelector('.form');
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      changePage('/');
    });
    // Обработчик ссылки в форме с переадресацией на страницу регистрации
    form.querySelector('.form__link').addEventListener('click', (evt) => {
      evt.preventDefault();
      changePage('./signin');
    });
  }
}


// Отрисовываем страницу
renderPage();

// Отслеживаем событие изменения истории
window.addEventListener('popstate', (evt) => {
  evt.preventDefault();
  renderPage(window.location.pathname);
});
