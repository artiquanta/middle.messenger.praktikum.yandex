import { expect } from 'chai';
import merge from './merge';
import { resultObject, sourceObject, targetObject } from '../testsData';

describe('Helpers/merge', () => {
  it('Объекты объендиняются', () => {
    const lhs = sourceObject;
    const rhs = targetObject;

    const mergedObject = merge(lhs, rhs);
    expect(mergedObject).to.be.deep.include(resultObject);
  });
});
