export const avatarLink = 'https://i.yapx.ru/VVF9j.png';

export const BASE_API_URL = 'https://ya-praktikum.tech/api/v2';

export const HEADERS = { 'Content-Type': 'application/json' };

export const PATTERNS: Record<string, RegExp> = {
  FIRST_NAME_PATTERN: /^[A-ZА-ЯЁ]{1}[a-zA-Zа-яА-ЯёЁ-]+$/,
  SECOND_NAME_PATTERN: /^[A-ZА-ЯЁ]{1}[a-zA-Zа-яА-ЯёЁ-]+$/,
  DISPLAY_NAME_PATTERN: /^[0-9a-zA-Zа-яА-ЯёЁ-]+$/,
  EMAIL_PATTERN: /^[a-z0-9а-яё-]+(\.[a-z0-9-а-яё]+)*@[a-z0-9а-яё-]+(\.[a-z0-9а-яё-]+)*(\.[a-zа-я]{1,245})$/i,
  LOGIN_PATTERN: /^([-_]*\d*[-_]*[a-zA-Z]+[-_]*\d*[-_]*)+$/,
  OLDPASSWORD_PATTERN: /^(?=.*\d)(?=.*[A-ZА-ЯЁ])((?=.*[;#?!@$%^&*,.+():%№\\/|])|(?=.*_))^[^ ]+$/,
  NEWPASSWORD_PATTERN: /^(?=.*\d)(?=.*[A-ZА-ЯЁ])((?=.*[;#?!@$%^&*,.+():%№\\/|])|(?=.*_))^[^ ]+$/,
  PASSWORD_REPEAT_PATTERN: /^(?=.*\d)(?=.*[A-ZА-ЯЁ])((?=.*[;#?!@$%^&*,.+():%№\\/|])|(?=.*_))^[^ ]+$/,
  PASSWORD_PATTERN: /^(?=.*\d)(?=.*[A-ZА-ЯЁ])((?=.*[;#?!@$%^&*,.+():%№\\/|])|(?=.*_))^[^ ]+$/,
  PHONE_PATTERN: /^[+]?[0-9]+$/i,
  MESSAGE_PATTERN: /^[A-Zа-яёa-zА-ЯЁ0-9;#?!@$%^&*,.+()<>{}_'":%№\\/| \n]+$/m,
  CHAT_SEARCH_PATTERN: /^[0-9a-zA-Zа-яА-ЯёЁ-]*$/,
};

export const VALIDATION_ERRORS: Record<string, string> = {
  FIRST_NAME_ERROR: 'С заглавной буквы. Без цифр и знаков. Исключение: "-"',
  SECOND_NAME_ERROR: 'С заглавной буквы. Без цифр и знаков. Исключение: "-"',
  DISPLAY_NAME_ERROR: 'Разрешены цифры и буквы, а также знак "-"',
  EMAIL_ERROR: 'Указан некорректный формат e-mail',
  LOGIN_ERROR: 'Логин может состоять из цифр и букв. Минимум - 3, максимум - 20.',
  OLDPASSWORD_ERROR: 'От 8 до 40 символов. Обязательно: Верхний регистр',
  NEWPASSWORD_ERROR: 'Любые символы и буквы. Пробел запрещён. От 8 до 40 символов.',
  PASSWORD_REPEAT_ERROR: 'Пароль не совпадает. Проверьте пароль и повторите попытку!',
  PASSWORD_ERROR: 'Любые символы и буквы. Пробел запрещён. От 8 до 40 символов.',
  PHONE_ERROR: 'Допускается + в начале номера. От 10 до 15 символов.',
  MESSAGE_ERROR: 'Вы не ввели сообщение',
};

export const SIGNUP_URL = '/sign-up';

export const SIGNIN_URL = '/';

export const MESSENGER_URL = '/messenger';

export const PROFILE_URL = '/settings';

export const BASE_RESOURCE_URL = 'https://ya-praktikum.tech/api/v2/resources';
