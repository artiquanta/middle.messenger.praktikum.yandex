import { expect } from 'chai';
import { checkIfToday, convertDay, convertTime } from './convertTime';
import { epochTime } from '../testsData';

describe('Helpers/Convert Time', () => {
  it('Время конвертируется', () => {
    const convertedTime = convertTime(epochTime * 1000);
    const timeToCompare = new Date(epochTime * 1000).toLocaleTimeString('ru-RU', { timeStyle: 'short' });
    expect(convertedTime).to.be.a('string').that.equal(timeToCompare);
  });

  it('Дата конвертируется', () => {
    const convertedDay = convertDay(epochTime * 1000);
    const dateToCompare = new Date(epochTime * 1000).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' });
    expect(convertedDay).to.be.a('string').that.equal(dateToCompare);
  });

  it('Проверяет, соответствует ли дата сегодняшнему дню', () => {
    const todayDate: EpochTimeStamp = new Date().getTime();
    const isToday = checkIfToday(todayDate);
    expect(isToday).to.be.a('boolean').that.equal(true);
  });
});
