import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { nullify } from './../../skills';

describe('nullify', () => {
  let theNullifySkill = theCombatSkill(nullify);

  describe('effects', () => {
    theNullifySkill.shouldAffectTheDefender
      .applyingTheStatus('nullified').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theNullifySkill.shouldNotAffectTheAttacker();
  });
});
