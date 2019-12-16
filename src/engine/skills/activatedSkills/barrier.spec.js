import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { protect } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('protect', () => {
  let barrier = theActivationSkill(protect);

  barrier.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    barrier.whenAffectingTargets
      .shouldOnlyAffectTheStatus('protection').stackingWithCurrentValue();
  });
});
