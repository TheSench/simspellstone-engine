import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { enlarge } from './../skills';

describe('enlarge', () => {
  let theEnlargeSkill = theActivationSkill(enlarge);

  theEnlargeSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreActive()
    .andNeverBeNegated();

  describe('effects', () => {
    theEnlargeSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
  });
});
