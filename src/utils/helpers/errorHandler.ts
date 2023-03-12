import ApiError from '../ApiError/ApiError';

export default (err: Error, message?: string) => {
  if (err instanceof ApiError) {
    return `${err.message}. Причина: ${err.reason}. Код ответа: ${err.statusCode}`;
  }

  if (err instanceof Error) {
    return message || 'Что-то пошло не так! Попробуй ещё раз!';
  }

  return '';
};
