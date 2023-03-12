import { expect } from 'chai';
import cloneDeep from './deepClone';

describe('Helpers/DeepClone. Корректно копирует:', () => {
  it('Объект', () => {
    const testData = {
      test: 1,
      test2: false,
      test3: 'test',
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Объект с большой вложенностью', () => {
    const testData = {
      test: {
        test: {
          test: {
            test: {
              test: 'testValue',
            },
            test2: 'testValue2',
          },
        },
      },
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Объект с символами в качестве ключей', () => {
    const testSymbol = Symbol('test');
    const testData: Record<symbol, string> = {};
    testData[testSymbol] = 'testResult';
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Значения, не являющиеся объектами', () => {
    const testData = {
      test: undefined,
      test2: false,
      test3: 'test',
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Null', () => {
    const testNull = {
      test: null,
    };
    const cloned = cloneDeep(testNull);
    expect(cloned).to.be.deep.include(testNull);
  });

  it('Date', () => {
    const testDate = new Date();
    const testData = {
      test: testDate,
      test2: false,
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Array', () => {
    const testData = {
      test: ['test', false, 'test2'],
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Set', () => {
    const testSet = new Set();
    testSet.add(1);
    testSet.add(2);
    testSet.add({ test: 'test' });
    const testData = {
      test: testSet,
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });

  it('Map', () => {
    const testMap = new Map();
    testMap.set('1', false);
    testMap.set(['test', 1], false);
    const testData = {
      test: testMap,
    };
    const cloned = cloneDeep(testData);
    expect(cloned).to.be.deep.include(testData);
  });
});
