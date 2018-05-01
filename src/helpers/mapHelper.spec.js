import { expect } from 'chai';
import { reverseMap } from './mapHelpers';

describe('reverseMap', () => {
  const origMap = {
    prop0: 0,
    prop1: 1,
    prop2: 2
  };

  it('make a reversed enum', () => {
    let reversed = reverseMap(origMap)

    expect(reversed).to.deep.equal({
      0: 'prop0',
      1: 'prop1',
      2: 'prop2',
    });
  });
});
