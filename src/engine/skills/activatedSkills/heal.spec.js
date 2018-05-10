import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';
import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { heal } from './../skills';

describe('heal', () => {
  let theHealSkill = theSkill(heal);

  theHealSkill.shouldTarget.allAlliedUnits();
  theHealSkill.shouldOnlyAffect.targetsThatAreAlive();

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
    theHealSkill.shouldHealDamage.equalToItsValue();
    theHealSkill.shouldNotAffectStatusesOtherThan('healthLeft');
    theHealSkill.shouldBeNegatedBy.nullified();
  });
});
