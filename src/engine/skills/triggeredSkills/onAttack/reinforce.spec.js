import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { reinforce } from './../../skills';

describe('reinforce', () => {
  let theReinforceSkill = theCombatSkill(reinforce);

  describe('effects', () => {
    theReinforceSkill.shouldAffectTheAttacker
      .applyingTheStatus('protection').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theReinforceSkill.shouldNotAffectTheDefender();
  });
});
