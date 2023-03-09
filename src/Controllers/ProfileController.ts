import Store from '../services/Store/Store';
import UserApi from '../utils/Api/UserApi';
import { BASE_RESOURCE_URL } from '../utils/constants';
import errorHandler from '../utils/helpers/errorHandler';
import ErrorMessages from '../utils/errorMessages';
import defaultAvatar from '../images/default-avatar.svg';
import { ChangePasswordType, UpdateProfileType, UserType } from '../types/types';

class ProfileController {
  async updateProfile(data: UpdateProfileType): Promise<void> {
    try {
      const userData = await UserApi.updateProfile(data) as UserType | null;
      if (userData) {
        userData.avatar = userData.avatar ? `${BASE_RESOURCE_URL}/${userData.avatar}` : defaultAvatar;
        Store.set('user', userData);
      }
    } catch (err) {
      if (err instanceof Error) {
        Store.set('safe.formError', ErrorMessages.UPDATE_PROFILE);
      }
    }
  }

  async changePassword(data: ChangePasswordType): Promise<void> {
    try {
      await UserApi.changePassword(data.oldPassword, data.newPassword);
    } catch (err) {
      if (err instanceof Error) {
        Store.set('safe.formError', ErrorMessages.CHANGE_PASSWORD);
      }
    }
  }

  async updateAvatar(data: FormData): Promise<void> {
    try {
      const userData = await UserApi.updateAvatar(data) as UserType | null;
      if (userData) {
        const avatar = `${BASE_RESOURCE_URL}/${userData.avatar}`;
        Store.set('user.avatar', avatar);
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error(errorHandler(err, ErrorMessages.UPDATE_AVATAR));
      }
    }
  }
}

export default ProfileController;
