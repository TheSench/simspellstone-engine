import { expect } from 'chai';
import { reverseMap } from './mapHelpers';

describe('reverseMap', () => {
  it('should make an object with swapped keys/values of  the given object', () => {
    let reversed = reverseMap({
      prop0: 0,
      prop1: 1,
      prop2: 2
    });

    expect(reversed).to.deep.equal({
      0: 'prop0',
      1: 'prop1',
      2: 'prop2',
    });
  });

  it('should make an object with swapped keys/values of  the given object', () => {
    let reversed = reverseMap({
      a: 'x',
      b: 'y',
      c: 'z'
    });

    expect(reversed).to.deep.equal({
      x: 'a',
      y: 'b',
      z: 'c',
    });
  });
});
