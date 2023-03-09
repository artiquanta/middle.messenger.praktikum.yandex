export const form = `<form class="form" id="loginForm" novalidate="">
<h1 class="form__heading">Рады видеть!</h1>
<div class="form__inputs">
  <span class="form-error"></span>
  <label class="form-input">
<span class="form-input__title">Логин</span>
<input type="text" name="login" class="form-input__input" minlength="3" maxlength="20" required="">
<span class="form-input__error"></span>
</label>
  <label class="form-input">
<span class="form-input__title">Пароль</span>
<input type="password" name="password" class="form-input__input form-input__input_type_password" minlength="8" maxlength="40" required="">
<span class="form-input__error"></span>
</label>
</div>
<button class="form__button" type="submit" disabled="">Войти</button>
<a href="/sign-up" class="form__link">Нет аккаунта?</a>
</form>`;

export const epochTime: EpochTimeStamp = 1678281039;

export const sourceObject = {
  test: {
    test: 'testValue',
  },
  test2: 'testValue2',
  test3: {
    test: ['test', 'test2', 'test3'],
  },
};

export const targetObject = {
  test: {
    test2: 'testValue2',
    test3: {
      test: 'testValue',
    },
  },
  test3: {
    test2: false,
  },
};

export const resultObject = {
  test: {
    test: 'testValue',
    test2: 'testValue2',
    test3: {
      test: 'testValue',
    },
  },
  test2: 'testValue2',
  test3: {
    test: ['test', 'test2', 'test3'],
    test2: false,
  },
};

export const errorMessage = 'При обращении к серверу произошла ошибка. Причина: страница не найдена. Код ответа: 404';
