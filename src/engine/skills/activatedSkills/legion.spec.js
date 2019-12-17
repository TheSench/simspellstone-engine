import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { legion } from './../skills';
import { default as describeSkill } from './activatedSkills.spec';

describeSkill('legion', () => {
  let theLegionSkill = theActivationSkill(legion);

  theLegionSkill.shouldTarget.adjacentAlliedUnits()
    .onlyAffecting.targetsThatAreActive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    theLegionSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
  });
});
