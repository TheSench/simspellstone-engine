import { expect } from 'chai';
import { heal } from './../skills';
import { testTargetting, testPotentialTargets, testHealing, testNegation } from './../skillTestCommon/skillCommon.spec';
import { createTestUnit } from './../../unitFactory/unitFactory';

describe('heal', () => {
  testTargetting(heal);
  testPotentialTargets.allAllied(heal);

  const units = {
    undamaged: createTestUnit(),
    damaged: createTestUnit({ status: { healthLeft: 5 } })
  };
  const allUnits = [units.undamaged, units.damaged];

  describe('targetting', () => {
    it(`should target undamaged units when targetting ALL`, () => {
      let actualTargets = heal.getFilteredTargets({ all: true }, allUnits);
      let expectedTargets = allUnits;

      expect(actualTargets).to.deep.equal(expectedTargets);
    });

    it(`should target damaged units when targetting single unit`, () => {
      let actualTargets = heal.getFilteredTargets({ all: false }, [units.damaged]);
      let expectedTargets = [units.damaged];

      expect(actualTargets).to.deep.equal(expectedTargets);
    });

    it(`should NOT target undamaged units when targetting single unit`, () => {
      let actualTargets = heal.getFilteredTargets({ all: false }, [units.undamaged]);
      let expectedTargets = [];

      expect(actualTargets).to.deep.equal(expectedTargets);
    });
  });

  describe('effects', () => {
    testHealing(heal);
    testNegation(heal, 'nullified');
  });
});
