enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

type Options = {
  method: METHOD;
  data?: any;
  timeout?: number,
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.GET });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.POST });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.PUT });
  }

  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.PATCH });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    const timeout = options.timeout ? options.timeout : 5000;
    return this._request(url, timeout, { ...options, method: METHOD.DELETE });
  }

  _queryStringify(data: any = {}): string {
    if (!data || typeof data !== 'object') {
      return '';
    }

    const keys = Object.keys(data);

    return keys.reduce((result: string, key: string, index: number): string => `${result}${key}=${typeof data[key] === 'object'
      ? JSON.stringify(data[key])
      : data[key]}${index < keys.length - 1 ? '&' : ''}`);
  }

  _request(url: string, timeoutValue: number, options: Options = {
    method: METHOD.GET,
  }): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;
      xhr.open(method, isGet && data ? `${url}${this._queryStringify(data)}` : url);

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
