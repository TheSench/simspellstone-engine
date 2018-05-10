import { expect } from 'chai';
import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { createTestUnit } from './../../unitFactory/unitFactory';
import { heal } from './../skills';

describe('heal', () => {
  let theHealSkill = theActivationSkill(heal);

  theHealSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.nullified();

  // TODO: Move to helpers
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
    theHealSkill.whenAffectingTargets
      .shouldHealDamage.equalToItsValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
