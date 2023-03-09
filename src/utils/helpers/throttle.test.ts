import { expect } from 'chai';
import throttle from './throttle';

describe('Helpers/throttle', () => {
  function timeout(time: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, time);
    });
  }

  it('Задержка устанавливается', async () => {
    const testData: Record<string, boolean> = {
      test: false,
    };

    function setValue(value: boolean) {
      testData.test = value;
    }

    throttle(setValue, 350)(true);
    await timeout(351);
    expect(testData.test).to.be.a('boolean').that.equal(true);
  });
});
