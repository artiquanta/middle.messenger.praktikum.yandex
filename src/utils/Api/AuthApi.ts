import BaseApi from './BaseApi';
import { BASE_API_URL, HEADERS } from '../constants';
import { LoginFormDataType, RegisterFormDataType } from '../../types/types';

class UserApi extends BaseApi {
  constructor() {
    super(`${BASE_API_URL}/auth`);
  }

  register(userData: RegisterFormDataType) {
    const {
      login,
      email,
      password,
      phone,
    } = userData;

    return this._http.post(`${this._baseUrl}/signup`, {
      headers: HEADERS,
      data: JSON.stringify({
        first_name: userData.first_name,
        second_name: userData.second_name,
        login,
        email,
        password,
        phone,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  login(userData: LoginFormDataType) {
    const { login, password } = userData;

    return this._http.post(`${this._baseUrl}/signin`, {
      headers: HEADERS,
      credentials: true,
      data: JSON.stringify({
        login,
        password,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  logout() {
    return this._http.post(`${this._baseUrl}/logout`, {
      headers: HEADERS,
      credentials: true,
    })
      .then((res) => this._checkFetch(res));
  }

  getUser() {
    return this._http.get(`${this._baseUrl}/user`, {
      headers: HEADERS,
      credentials: true,
    })
      .then((res) => this._checkFetch(res));
  }
}

export default new UserApi();
