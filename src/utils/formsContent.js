export const loginForm = {
  form: {
    heading: 'Рады видеть!',
    link: {
      url: './signup',
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
      url: './signin',
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
      name: 'first_name',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'second_name',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'phone',
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
      name: 'password_repeat',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
  ],
};

export const addUserForm = {
  form: {
    buttonTitle: 'Добавить',
  },
  inputs: [
    {
      title: 'Добавление пользователя',
      type: 'text',
      name: 'login',
      minLength: '3',
      maxLength: '20',
      required: true,
    },
  ],
};

export const personalForm = {
  form: {
    buttonTitle: 'Сохранить изменения',
  },
  inputs: [
    {
      title: 'Имя',
      type: 'text',
      name: 'first_name',
      minLength: '2',
      maxLength: '30',
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'second_name',
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
      name: 'display_name',
      minLength: '5',
      maxLength: '61',
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'phone',
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
      name: 'oldPassword',
      minLength: '6',
      maxLength: '25',
      required: true,
    },
    {
      title: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
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
