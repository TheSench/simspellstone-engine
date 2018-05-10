import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { berserk } from './../../skills';

describe('berserk', () => {
  let theBerserkSkill = theCombatSkill(berserk);

  describe('effects', () => {
    theBerserkSkill.shouldAffectTheAttacker
      .applyingTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theBerserkSkill.shouldNotAffectTheDefender();
  });
});
