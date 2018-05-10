import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { nullify } from './../../skills';

describe('nullify', () => {
  let theNullifySkill = theCombatSkill(nullify);

  describe('effects', () => {
    theNullifySkill.givenTheDefender
      .shouldAffectTheStatus('nullified').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theNullifySkill.shouldNotAffectTheAttacker();
  });
});
