import { expect } from 'chai';
import Store from './Store';

describe('Services/Store. Хранилище', () => {
  it('Данные сохраняются в state', () => {
    Store.set('test', 'testValue', true);
    const { test } = Store.getState();
    expect(test).to.be.a('string').that.equal('testValue');
  });

  it('Данные сохраняются в LocalStorage', () => {
    Store.set('safe.test2', 'testValue2');
    Store.set('test3', 'testValue3', true);
    const localStorageData = JSON.parse(localStorage.getItem('store')!);
    expect(localStorageData.test).to.be.a('string').that.equal('testValue');
  });

  it('Хранилище возвращает текущее состояние', () => {
    const { test } = Store.getState();
    expect(test).to.be.a('string').that.equal('testValue');
  });

  it('Объект Safe не сохраняется в LocalStorage', () => {
    const localStorageData = JSON.parse(localStorage.getItem('store')!);
    expect(localStorageData.safe).to.be.an('undefined');
  });

  it('Объект Safe очищается корректно', () => {
    Store.set('safe.test', 'testValue');
    Store.set('safe.test2', 'testValue2');
    Store.clearSafeState();
    const { safe } = Store.getState();
    expect(safe).to.be.an('undefined');
  });

  it('Данные хранилища очищаются корректно', () => {
    Store.clearState();
    const storeState = Object.values(Store.getState());
    expect(storeState.length).to.be.a('number').that.equal(0);
  });

  it('Данные LocalStorage очищаются корректно', () => {
    Store.set('test', 'testValue', true);
    Store.clearState();
    const localStorageData = JSON.parse(localStorage.getItem('store')!);
    expect(localStorageData).to.be.a('null');
  });
});
