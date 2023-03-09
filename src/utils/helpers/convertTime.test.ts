import { expect } from 'chai';
import { checkIfToday, convertDay, convertTime } from './convertTime';
import { epochTime } from '../testsData';

describe('Helpers/Convert Time', () => {
  it('Время конвертируется', () => {
    const convertedTime = convertTime(epochTime * 1000);
    expect(convertedTime).to.be.a('string').that.equal('20:10');
  });

  it('Дата конвертируется', () => {
    const convertedDay = convertDay(epochTime * 1000);
    expect(convertedDay).to.be.a('string').that.equal('08 марта 2023\u202fг.');
  });

  it('Проверяет, соответствует ли дата сегодняшнему дню', () => {
    const todayDate: EpochTimeStamp = new Date().getTime();
    const isToday = checkIfToday(todayDate);
    expect(isToday).to.be.a('boolean').that.equal(true);
  });
});
