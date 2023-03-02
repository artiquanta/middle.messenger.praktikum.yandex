import BaseApi from './BaseApi';
import { BASE_API_URL, HEADERS } from '../constants';

class ChatControlsApi extends BaseApi {
  constructor() {
    super(`${BASE_API_URL}/chats`);
  }

  getChats(): Promise<unknown> { // query-параметры. Возможно, нужно добавить.
    return this._http.get(`${this._baseUrl}`, {
      credentials: true,
      headers: HEADERS,
    })
      .then((res) => this._checkFetch(res));
  }

  createChat(title: string): Promise<unknown> {
    return this._http.post(`${this._baseUrl}`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        title,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  deleteChat(chatId: number): Promise<unknown> {
    return this._http.delete(`${this._baseUrl}`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        chatId,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  getChatUsers(chatId: number): Promise<unknown> {
    return this._http.get(`${this._baseUrl}/${chatId}/users`, {
      credentials: true,
      headers: HEADERS,
    })
      .then((res) => this._checkFetch(res));
  }

  getCommonChats(chatId: number): Promise<unknown> {
    return this._http.get(`${this._baseUrl}/${chatId}/common`, {
      credentials: true,
      headers: HEADERS,
    })
      .then((res) => this._checkFetch(res));
  }

  getUnreadMessagesCount(chatId: number): Promise<unknown> {
    return this._http.get(`${this._baseUrl}/new/${chatId}`, {
      credentials: true,
      headers: HEADERS,
    })
      .then((res) => this._checkFetch(res));
  }

  updateChatAvatar(chatId: number, file: FormData): Promise<unknown> { // FormData
    return this._http.put(`${this._baseUrl}/avatar`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        chatId,
        file,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  addUserToChat(user: number, chatId: number): Promise<unknown> { // users - массив id user
    return this._http.put(`${this._baseUrl}/users`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        users: [user],
        chatId,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  removeUserFromChat(user: number, chatId: number): Promise<unknown> {
    return this._http.delete(`${this._baseUrl}/users`, {
      credentials: true,
      headers: HEADERS,
      data: JSON.stringify({
        users: [user],
        chatId,
      }),
    })
      .then((res) => this._checkFetch(res));
  }

  getChatToken(chatId: number): Promise<unknown> {
    return this._http.post(`${this._baseUrl}/token/${chatId}`, {
      headers: HEADERS,
      credentials: true,
    })
      .then((res) => this._checkFetch(res));
  }
}

export default new ChatControlsApi();
