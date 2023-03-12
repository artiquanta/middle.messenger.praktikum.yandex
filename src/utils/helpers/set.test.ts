import { expect } from 'chai';
import set from './set';

describe('Helpers/set', () => {
  it('Возвращает цель, если тип цели не объект', () => {
    const result = set('a', 'test', true);
    expect(result).to.be.a('string').that.equal('a');
  });

  it('Устанавливает новое значение по пути', () => {
    const testObject: Record<string, boolean> = {
      test: false,
    };

    const result = set(testObject, 'test', true) as Record<string, boolean>;
    expect(result.test).to.be.a('boolean').that.equal(true);
  });
});
