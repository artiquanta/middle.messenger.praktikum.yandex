import { expect } from 'chai';
import ApiError from '../ApiError/ApiError';
import errorHandler from './errorHandler';
import { errorMessage } from '../testsData';

describe('Helpers/errorHandler', () => {
  it('Обработка ошибки ApiError', () => {
    const result = errorHandler(new ApiError(404, 'страница не найдена'));

    expect(result).to.be.a('string').that.equal(errorMessage);
  });

  it('Обработка стандартной ошибки', () => {
    const result = errorHandler(new Error(), 'Что-то пошло не так...');

    expect(result).to.be.a('string').that.equal('Что-то пошло не так...');
  });
});
