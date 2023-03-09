import HTTPTransport from '../../services/HTTPTransport/HTTPTransport';

class BaseApi {
  _baseUrl: string;

  _http: HTTPTransport;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = new HTTPTransport();
  }

  // Проверка корректности выполнения запроса
  _checkFetch(res: XMLHttpRequest): JSON | Promise<unknown> {
    const isSuccessRequest = res.readyState === 4 && (res.status >= 200 && res.status <= 299);
    if (isSuccessRequest) {
      return res.response as JSON;
    }

    return Promise.reject(res);
  }
}

export default BaseApi;
