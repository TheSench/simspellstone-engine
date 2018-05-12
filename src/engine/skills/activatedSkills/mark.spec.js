import { theActivationSkill } from '../skillTestCommon/skillTestBase.spec';
import { mark } from './../skills';

describe('mark', () => {
  let theSkillMark = theActivationSkill(mark);

  theSkillMark.shouldTarget.allOpposingUnits()
    .onlyAffecting.targetsThatAreAlive()
    .unlessTheyAre.invisible();

  describe('effects', () => {
    theSkillMark.whenAffectingTargets
      .shouldOnlyAffectTheStatus('hexed').stackingWithCurrentValue();

    it('should not fire twice during dual-strike');
    it('should hit the same unit every turn until it dies');
  });
});
