enum METHOD {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
};

type Options = {
  method: METHOD;
  data?: any;
  timeout?: number,
}

type OptionsWithoutMethod = Omit<Options, 'method'>;

class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, { ...options, method: METHOD.GET }, options.timeout = 5000);
  }
  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, { ...options, method: METHOD.POST }, options.timeout = 5000);
  }
  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, { ...options, method: METHOD.PUT }, options.timeout = 5000);
  }
  patch(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, { ...options, method: METHOD.PATCH }, options.timeout = 5000);
  }
  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this._request(url, { ...options, method: METHOD.DELETE }, options.timeout = 5000);
  }

  _queryStringify(data: any = {}): string {
    if (!data || typeof data !== 'object') {
      return '';
    }

    const keys = Object.keys(data);
    return keys.reduce((result: string, key: string, index: number): string => {
      return `${result}${key}=${typeof data[key] === 'object'
        ? JSON.stringify(data[key])
        : data[key]}${index < keys.length - 1 ? '&' : ''}`;
    });
  }

  _request(url: string, options: Options = { method: METHOD.GET }, timeout: number): Promise<XMLHttpRequest> {
    const { method, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const isGet = method === METHOD.GET;
      xhr.open(method, isGet && data ? `${url}${this._queryStringify(data)}` : url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}

export default HTTPTransport;
