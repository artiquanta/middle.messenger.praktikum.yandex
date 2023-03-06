import Store from '../services/Store/Store';
import UserApi from '../utils/Api/UserApi';
import { BASE_RESOURCE_URL } from '../utils/constants';
import defaultAvatar from '../images/default-avatar.svg';
import { ChangePasswordType, UpdateProfileType, UserType } from '../types/types';

class ProfileController {
  async updateProfile(data: UpdateProfileType) {
    return UserApi.updateProfile(data)
      .then((res) => {
        const userData = res as UserType;
        userData.avatar = userData.avatar ? `${BASE_RESOURCE_URL}/${userData.avatar}` : defaultAvatar;
        Store.set('user', userData);
      })
      .catch((err) => err);
  }

  async changePassword(data: ChangePasswordType) {
    return UserApi.changePassword(data.oldPassword, data.newPassword)
      .catch((err) => err);
  }

  async updateAvatar(data: FormData) {
    return UserApi.updateAvatar(data)
      .then((res) => {
        const userData = res as UserType;
        const avatar = `${BASE_RESOURCE_URL}/${userData.avatar}`;
        Store.set('user.avatar', avatar);
      })
      .catch((err) => err);
  }
}

export default ProfileController;
