class ApiError extends Error {
  statusCode: number;

  reason: string;

  constructor(code: number, reason?: string) {
    super('При обращении к серверу произошла ошибка');
    this.name = 'ApiError';

    // Сохраняем код ошибки
    this.statusCode = code;

    // Добавляем причину ошибки
    this.reason = reason || '';
  }
}

export default ApiError;
