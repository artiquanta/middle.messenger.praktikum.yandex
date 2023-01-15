const avatarLink = 'https://i.yapx.ru/VVF9j.png';

export const userId = 123;

export const chats = [
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 3,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Другое имя',
    lastMessage: 'Птичка',
    time: '12:15',
    unreadCount: 12,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Группа "Интересы"',
    lastMessage: 'Кто здесь?',
    time: '13:15',
    unreadCount: 1,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName Точно',
    lastMessage: 'Локация',
    time: '14:55',
    unreadCount: 5,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Человек 1',
    lastMessage: 'Файл',
    time: '13:12',
    unreadCount: 11,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'Человек 2',
    lastMessage: 'Видео',
    time: '11:05',
    unreadCount: 120,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек 3',
    lastMessage: 'Видео',
    time: '19:15',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: true,
    link: avatarLink,
    name: 'Человек Человеков',
    lastMessage: 'Привет!',
    time: '18:35',
    unreadCount: 0,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
  {
    owner: false,
    link: avatarLink,
    name: 'NickName',
    lastMessage: 'Сюрприз!',
    time: '11:05',
    unreadCount: 12,
  },
];

export const chatData = {
  group: true,
  groupMembers: [
    {
      name: 'Человек 1',
      avatar: avatarLink,
      id: 123,
      owner: false,
    },
    {
      name: 'Человек 2',
      avatar: avatarLink,
      id: 15,
      owner: true,
    },
  ],
  name: 'Группа "Человеков"',
  messages: [
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек Человеков',
      },
      content: {
        type: 'text',
        value: 'Привет! Как дела?',
      },
      time: 1672902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1672902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1671902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1662902091,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'location',
        value: 'http://localhost:1234/file.txt',
      },
      time: 1662902191,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'video',
        value: 'https://pictures.s3.yandex.net/iframes_topic/3.mp4',
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'image',
        value: avatarLink,
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 121,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'image',
        value: avatarLink,
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'file',
        value: 'http://localhost:1234/file.txt',
        fileName: 'file.txt',
      },
      time: 1662902091,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'location',
        value: 'http://localhost:1234/file.txt',
      },
      time: 1662902191,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'video',
        value: 'https://pictures.s3.yandex.net/iframes_topic/3.mp4',
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'image',
        value: avatarLink,
      },
      time: 1664902191,
    },
    {
      owner: {
        id: 123,
        avatar: avatarLink,
        username: 'Человек',
      },
      content: {
        type: 'image',
        value: avatarLink,
      },
      time: 1664902191,
    },
  ],
};

export const loginForm = {
  form: {
    heading: 'Рады видеть!',
    link: {
      url: './register',
      title: 'Нет аккаунта?',
    },
    buttonTitle: 'Войти',
  },
  inputs: [
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: '3',
      maxLength: '20',
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      name: 'password',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
  ],
};

export const registerForm = {
  form: {
    heading: 'Добро пожаловать! ',
    link: {
      url: './login',
      title: 'Войти',
    },
    buttonTitle: 'Зарегистрироваться',
  },
  inputs: [
    {
      title: 'Почта',
      type: 'email',
      name: 'email',
      minLength: '5',
      maxLength: '60',
      required: true,
    },
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: '3',
      maxLength: '20',
      required: true,
    },
    {
      title: 'Имя',
      type: 'text',
      name: 'name',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'surname',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'number',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      name: 'password',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
    {
      title: 'Повторите пароль',
      type: 'password',
      name: 'password-repeat',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
  ],
};

export const userInfo = {
  user: {
    id: 123,
    name: 'Человек',
    surname: 'Человеков',
    username: 'Человек!',
    login: 'chelovek',
    email: 'chelovek@test.test',
    phone: '+7-901-000-00-01',
    avatar: avatarLink,
  },
}

export const personalForm = {
  form: {
    buttonTitle: 'Сохранить изменения',
  },
  inputs: [
    {
      title: 'Имя',
      type: 'text',
      name: 'name',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'surname',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: '3',
      maxLength: '20',
      required: true,
    },
    {
      title: 'Почта',
      type: 'email',
      name: 'email',
      minLength: '5',
      maxLength: '60',
      required: true,
    },
    {
      title: 'Имя в чате',
      type: 'text',
      name: 'display-name',
      minLength: '5',
      maxLength: '61',
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'number',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
  ],
};

export const passwordForm = {
  form: {
    buttonTitle: 'Изменить пароль',
  },
  inputs: [
    {
      title: 'Старый пароль',
      type: 'password',
      name: 'old-password',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
    {
      title: 'Новый пароль',
      type: 'password',
      name: 'password',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
    {
      title: 'Повторите новый пароль',
      type: 'password',
      name: 'repeat-password',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
  ],
};
