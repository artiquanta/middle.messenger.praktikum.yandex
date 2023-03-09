import { expect } from 'chai';
import isEqual from './isEqual';

describe('Helpers/isEqual. Сравнивает:', () => {
  it('Объекты с примитивами', () => {
    const compared = {
      test: 'testValue',
      test2: 5,
      test3: false,
    };
    const target = {
      test: 'testValue',
      test2: 5,
      test3: false,
    };

    const isEqualObject = isEqual(compared, target);
    expect(isEqualObject).to.be.a('boolean').that.equal(true);
  });

  it('Объекты с массивами', () => {
    const compared = {
      test: [1, 3, 5],
      test2: ['test', 'test2'],
    };
    const target = {
      test: [1, 3, 5],
      test2: ['test', 'test2'],
    };

    const isEqualObject = isEqual(compared, target);
    expect(isEqualObject).to.be.a('boolean').that.equal(true);
  });

  it('Объекты с функциями по ссылке', () => {
    function returnZero(): number {
      return 0;
    }

    const compared = {
      test: returnZero,
    };
    const target = {
      test: returnZero,
    };

    const isEqualObject = isEqual(compared, target);
    expect(isEqualObject).to.be.a('boolean').that.equal(true);
  });

  it('Объекты с вложенными объектами', () => {
    const compared = {
      test: {
        test: 'test',
        test2: {
          test: 'test',
          test2: 'test2',
          test3: {
            test: 'testValue',
          },
        },
      },
    };
    const target = {
      test: {
        test: 'test',
        test2: {
          test: 'test',
          test2: 'test2',
          test3: {
            test: 'testValue',
          },
        },
      },
    };

    const isEqualObject = isEqual(compared, target);
    expect(isEqualObject).to.be.a('boolean').that.equal(true);
  });
});
