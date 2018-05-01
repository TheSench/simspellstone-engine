import { expect } from 'chai';
import { base64ToUnitKey, unitKeyToBase64 } from './unitHash';
import R from 'ramda';

describe('unit hashing', () => {
  const unitKeys = [
    {id: 1, level: 1, runeId: 0},
    {id: 500, level: 8, runeId: 0},
    {id: 1000, level: 6, runeId: 5505},
    {id: 21000, level: 6, runeId: 5100},
  ];

  unitKeys.forEach((unitKey) => {
    it('should return the same unitKey when hashed and unhashed', () => {
      var converted = R.pipe(unitKeyToBase64, base64ToUnitKey)(unitKey);

      expect(converted).to.deep.equal(unitKey);
    });
  });
});
