import AuthApi from '../utils/Api/AuthApi';
import Store from '../services/Store/Store';
import { BASE_RESOURCE_URL } from '../utils/constants';
import * as defaultAvatar from '../images/default-avatar.svg';
import { LoginFormDataType, RegisterFormDataType, UserType } from '../types/types';

class UserController {
  async login(data: LoginFormDataType) {
    return AuthApi.login(data)
      .then(async () => {
        const userId = await this.getCurrentUser();
        return userId;
      });
  }

  async register(data: RegisterFormDataType) {
    return AuthApi.register(data)
      .catch((err) => err);
  }

  async getCurrentUser(): Promise<number | void> {
    return AuthApi.getUser()
      .then((res) => {
        const userData = res as UserType;
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
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  async logout() {
    return AuthApi.logout()
      .then(() => {
        Store.set('safe.isProcessing', false);
        Store.offAll();
        Store.clearState();
      })
      .catch((err) => err);
  }
}

export default UserController;
