import { SIGNIN_URL, SIGNUP_URL } from './constants';

export type Form = {
  id: string,
  heading?: string,
  link?: {
    url: string
    title: string,
  },
  buttonTitle: string,
};

export type HTMLInputTypeAttribute = 'button' | 'checkbox' | 'color' | 'date' | 'datetime' | 'local' | 'email' | 'file' | 'hidden' | 'image' | 'month' | 'number' | 'password' | 'radio' | 'range' | 'reset' | 'search' | 'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

export type Inputs = {
  title: string,
  type: HTMLInputTypeAttribute,
  name: string,
  minLength: number,
  maxLength: number,
  required: boolean,
}[];

export type FormType = {
  form: Form,
  inputs: Inputs,
};

export const loginForm: FormType = {
  form: {
    id: 'loginForm',
    heading: 'Рады видеть!',
    link: {
      url: SIGNUP_URL,
      title: 'Нет аккаунта?',
    },
    buttonTitle: 'Войти',
  },
  inputs: [
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      name: 'password',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
  ],
};

export const registerForm: FormType = {
  form: {
    id: 'registerForm',
    heading: 'Добро пожаловать! ',
    link: {
      url: SIGNIN_URL,
      title: 'Войти',
    },
    buttonTitle: 'Зарегистрироваться',
  },
  inputs: [
    {
      title: 'Почта',
      type: 'email',
      name: 'email',
      minLength: 5,
      maxLength: 60,
      required: true,
    },
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    {
      title: 'Имя',
      type: 'text',
      name: 'first_name',
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'second_name',
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'phone',
      minLength: 10,
      maxLength: 15,
      required: true,
    },
    {
      title: 'Пароль',
      type: 'password',
      name: 'password',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
    {
      title: 'Повторите пароль',
      type: 'password',
      name: 'password_repeat',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
  ],
};

export const addUserForm: FormType = {
  form: {
    id: 'addUserForm',
    buttonTitle: 'Добавить',
  },
  inputs: [
    {
      title: 'Добавление пользователя',
      type: 'text',
      name: 'login',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
  ],
};

export const personalForm: FormType = {
  form: {
    id: 'personalForm',
    buttonTitle: 'Сохранить изменения',
  },
  inputs: [
    {
      title: 'Имя',
      type: 'text',
      name: 'first_name',
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    {
      title: 'Фамилия',
      type: 'text',
      name: 'second_name',
      minLength: 2,
      maxLength: 30,
      required: true,
    },
    {
      title: 'Логин',
      type: 'text',
      name: 'login',
      minLength: 3,
      maxLength: 20,
      required: true,
    },
    {
      title: 'Почта',
      type: 'email',
      name: 'email',
      minLength: 5,
      maxLength: 60,
      required: true,
    },
    {
      title: 'Имя в чате',
      type: 'text',
      name: 'display_name',
      minLength: 5,
      maxLength: 61,
      required: true,
    },
    {
      title: 'Телефон',
      type: 'tel',
      name: 'phone',
      minLength: 10,
      maxLength: 15,
      required: true,
    },
  ],
};

export const passwordForm: FormType = {
  form: {
    id: 'passwordForm',
    buttonTitle: 'Изменить пароль',
  },
  inputs: [
    {
      title: 'Старый пароль',
      type: 'password',
      name: 'oldPassword',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
    {
      title: 'Новый пароль',
      type: 'password',
      name: 'newPassword',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
    {
      title: 'Повторите новый пароль',
      type: 'password',
      name: 'password_repeat',
      minLength: 8,
      maxLength: 40,
      required: true,
    },
  ],
};
