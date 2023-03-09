import HTTPTransport from '../../services/HTTPTransport/HTTPTransport';
import ApiError from '../ApiError/ApiError';

abstract class BaseApi {
  _baseUrl: string;

  _http: HTTPTransport;

  constructor(baseUrl: string) {
    this._baseUrl = baseUrl;
    this._http = new HTTPTransport();
  }

  private _isInRange(value: number, start: number, end: number): boolean {
    return value >= start && value <= end;
  }

  // Проверка корректности выполнения запроса
  _checkFetch(res: XMLHttpRequest): JSON | Promise<unknown> {
    const isReady = res.readyState === 4;
    const responseStatus = res.status;
    const isSuccessRequest = isReady && this._isInRange(responseStatus, 200, 299);
    const isClientError = isReady && this._isInRange(responseStatus, 400, 499);
    const isServerError = isReady && this._isInRange(responseStatus, 500, 599);

    if (isSuccessRequest) {
      return res.response as JSON;
    }

    if (isClientError) {
      return Promise.reject(new ApiError(responseStatus, res.response.reason));
    }

    if (isServerError) {
      return Promise.reject(new ApiError(responseStatus, 'Ошибка при запросе на сервер'));
    }

    return Promise.reject(new Error('Произошла ошибка при отправке запроса на сервер'));
  }
}

export default BaseApi;
