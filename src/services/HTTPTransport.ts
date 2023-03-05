enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  credentials?: boolean,
  headers?: Record<string, string>,
  data?: any;
  timeout?: number,
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

type HTTPMethod = (url: string, options: OptionsWithoutMethod) => Promise<XMLHttpRequest>;

class HTTPTransport {
  public get: HTTPMethod = (url, options = {}) => {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.GET });
  };

  public post: HTTPMethod = (url, options = {}) => {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.POST });
  };

  public put: HTTPMethod = (url, options = {}) => {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.PUT });
  };

  public patch: HTTPMethod = (url, options = {}) => {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.PATCH });
  };

  public delete: HTTPMethod = (url, options = {}) => {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.DELETE });
  };

  private _queryStringify(data: any = {}): string {
    if (!data || typeof data !== 'object') {
      return '';
    }

    const keys = Object.keys(data);

    return keys.reduce((result: string, key: string, index: number): string => `${result}${key}=${typeof data[key] === 'object'
      ? JSON.stringify(data[key])
      : data[key]}${index < keys.length - 1 ? '&' : ''}`);
  }

  private _request(url: string, timeoutValue: number, options: Options = {
    method: METHOD.GET,
  }): Promise<XMLHttpRequest> {
    const {
      method,
      credentials = false,
      headers = {},
      data,
    } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;
      xhr.open(method, isGet && data ? `${url}${this._queryStringify(data)}` : url);

      // Отсылаем куки, если необходимо
      xhr.withCredentials = credentials;

      // Добавляем заголовки, если заданы пользователем
      Object.entries(headers).forEach(([key, value]) => {
        xhr.setRequestHeader(key, value);
      });

      xhr.responseType = 'json';

      xhr.onload = () => resolve(xhr);

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeoutValue;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
