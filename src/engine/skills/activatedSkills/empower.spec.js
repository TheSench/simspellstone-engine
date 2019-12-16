import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { rally as empower } from './../skills';
import { default as describeSkill } from './../skills.spec';

describeSkill('empower', () => {
  let theEmpowerSkill = theActivationSkill(empower);

  theEmpowerSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreActive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    theEmpowerSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
  });
});
