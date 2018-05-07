import { expect } from 'chai';
import { base64ToUnitKey, unitKeyToBase64 } from './unitHash';
import R from 'ramda';

import * as gameData from './../../data/gameData';
import { fusions as mockFusions } from './../../mockData/mockFusions';
import sinon from 'sinon';

var sandbox = sinon.createSandbox();

describe('unit hashing', () => {
  beforeEach(() => {
    sandbox.replace(gameData, 'fusions', mockFusions);
  });

  afterEach(function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  const unitKeys = [
    {id: 1,     level: 1,   runeId: 0},     // Min values
    {id: 500,   level: 8,   runeId: 0},
    {id: 11001, level: 5,   runeId: 5200},
    {id: 1000,  level: 7,   runeId: 5999},  // Max values for base fusable unit
    {id: 9999,  level: 21,  runeId: 5999},  // Max values for unfusable unit
    {id: 21000, level: 7,   runeId: 5999},  // Max values for fused unit
  ];

  unitKeys.forEach((unitKey) => {
    it('should return the same unitKey when hashed and unhashed', () => {
      var converted = R.pipe(unitKeyToBase64, base64ToUnitKey)(unitKey);

      expect(converted).to.deep.equal(unitKey);
    });
  });
});
