import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { enfeeble } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('hex', () => {
  let hex = theActivationSkill(enfeeble);

  hex.shouldTarget.allOpposingUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    hex.whenAffectingTargets
      .shouldOnlyAffectTheStatus('hexed').stackingWithCurrentValue();
  });
});
