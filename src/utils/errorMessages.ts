enum ErrorMessages {
  BAD_RESPONSE = 'Что-то пошло не так, попробуйте ещё раз!',
  INCORRECT_LOGIN_DATA = 'Неправильный логин или пароль',
  LOGOUT_ERROR = 'При выходе из системы произошла ошибка',
  ADDUSER_ISCHATMEMBER = 'Пользователь уже состоит в чате',
  ADDUSER_NOTFOUND = 'Пользователь не найден. Попробуйте ещё раз!',
  BAD_DATA = 'Проверьте данные и попробуйте ещё раз!',
  SAME_PASSWORD = 'Ошибка. Новый пароль должен отличаться от старого!',
}

export default ErrorMessages;
