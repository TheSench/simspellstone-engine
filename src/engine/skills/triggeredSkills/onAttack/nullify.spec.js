import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
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
