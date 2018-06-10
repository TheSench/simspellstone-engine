import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { protect } from './../skills';

describe('protect', () => {
  let barrier = theActivationSkill(protect);

  barrier.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    barrier.whenAffectingTargets
      .shouldOnlyAffectTheStatus('protection').stackingWithCurrentValue();
  });
});
