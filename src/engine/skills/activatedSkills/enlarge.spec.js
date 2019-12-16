import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { enlarge } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('enlarge', () => {
  let theEnlargeSkill = theActivationSkill(enlarge);

  theEnlargeSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreActive()
    .andNeverBeNegated();

  describe('effects', () => {
    theEnlargeSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
  });
});
