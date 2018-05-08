import { whenTriggered } from '../testCombatSkill.spec';
import { poison } from './../../skills';

describe('poison', () => {
  let thePoisonSkill = whenTriggered(poison);

  describe('effects', () => {
    thePoisonSkill.shouldAffectTheDefender
      .applyingTheStatus('poisoned').keepingHighestValue()
      .and.affectNoOtherStatuses();

    it('adds poisoned to the attacker');

    thePoisonSkill.shouldNotAffectTheAttacker();
  });
});
