import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { poison } from './../../skills';

describe('poison', () => {
  let thePoisonSkill = theCombatSkill(poison);

  describe('effects', () => {
    thePoisonSkill.shouldAffectTheDefender
      .applyingTheStatus('poisoned').keepingHighestValue()
      .and.affectNoOtherStatuses();

    it('adds poisoned to the attacker');

    thePoisonSkill.shouldNotAffectTheAttacker();
  });
});
