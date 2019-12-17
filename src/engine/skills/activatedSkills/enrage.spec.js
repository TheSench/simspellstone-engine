import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { enrage } from './../skills';
import { default as describeSkill } from './activatedSkills.spec';

describeSkill('enrage', () => {
  let theEnrageSkill = theActivationSkill(enrage);

  theEnrageSkill.shouldTarget.allAlliedUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.nullified();

  describe('effects', () => {
    theEnrageSkill.whenAffectingTargets
      .shouldOnlyAffectTheStatus('enraged').stackingWithCurrentValue();
  });
});
