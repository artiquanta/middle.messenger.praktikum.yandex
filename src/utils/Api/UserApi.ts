import BaseApi from './BaseApi';
import { BASE_API_URL, HEADERS } from '../constants';
import { UpdateProfileType } from '../../types/types';

class UserApi extends BaseApi {
  constructor() {
    super(`${BASE_API_URL}/user`);
  }

  updateProfile(userData: UpdateProfileType): Promise<unknown> {
    const {
      login,
      email,
      phone,
    } = userData;

    return this._http.put(`${this._baseUrl}/profile`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        first_name: userData.first_name,
        second_name: userData.second_name,
        login,
        email,
        display_name: userData.display_name,
        phone,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  updateAvatar(file: FormData): Promise<unknown> {
    return this._http.put(`${this._baseUrl}/profile/avatar`, {
      credentials: true,
      data: file,
    })
      .then((res) => this._checkFetch(res));
  }

  changePassword(oldPassword: string, newPassword: string): Promise<unknown> {
    return this._http.put(`${this._baseUrl}/password`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  getUser(userId: number): Promise<unknown> {
    return this._http.get(`${this._baseUrl}/${userId}`, {
      credentials: true,
      headers: HEADERS,
    })
      .then((res) => this._checkFetch(res));
  }

  findUser(login: string): Promise<unknown> {
    return this._http.post(`${this._baseUrl}/search`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        login,
      }),
    })
      .then((res) => this._checkFetch(res));
  }
}

export default new UserApi();
