import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { rally as empower } from './../skills';

describe('empower', () => {
  let theEmpowerSkill = theActivationSkill(empower);

  theEmpowerSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreActive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    theEmpowerSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
  });
});
