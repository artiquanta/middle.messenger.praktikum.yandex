import AuthApi from '../utils/Api/AuthApi';
import Store from '../services/Store/Store';
import { BASE_RESOURCE_URL } from '../utils/constants';
import defaultAvatar from '../images/default-avatar.svg';
import errorHandler from '../utils/helpers/errorHandler';
import ErrorMessages from '../utils/errorMessages';
import ApiError from '../utils/ApiError/ApiError';
import { LoginFormDataType, RegisterFormDataType, UserType } from '../types/types';

class UserController {
  // Вход в систему
  async login(data: LoginFormDataType): Promise<void> {
    try {
      await AuthApi.login(data);
    } catch (err) {
      if (err instanceof ApiError) {
        Store.set('safe.formError', err.reason);
      }

      throw err;
    }
  }

  // Регистрация
  async register(data: RegisterFormDataType) {
    try {
      await AuthApi.register(data);
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.REGISTER));
      }

      throw err;
    }
  }

  // Получения текущего пользователя
  async getCurrentUser(): Promise<number | null> {
    try {
      const userData = await AuthApi.getUser() as UserType;
      const user = {
        avatar: userData.avatar ? `${BASE_RESOURCE_URL}/${userData.avatar}` : defaultAvatar,
        display_name: userData.display_name || '',
        email: userData.email,
        first_name: userData.first_name,
        id: userData.id,
        login: userData.login,
        phone: userData.phone,
        second_name: userData.second_name,
      };

      Store.set('user', user, true);
      return userData.id;
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.USER_INFO));
      }

      return null;
    }
  }

  // Выход из системы
  async logout() {
    try {
      await AuthApi.logout();
      Store.set('safe.isProcessing', false);
      // Отписка от всех событий и очистка хранилища
      Store.offAll();
      Store.clearState();
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.LOGOUT_ERROR));
      }

      throw err;
    }
  }
}

export default UserController;
