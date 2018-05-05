import { reinforce } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('reinforce', () => {
  let theReinforceSkill = whenTriggered(reinforce);

  describe('effects', () => {
    theReinforceSkill.shouldAffectTheAttacker
      .applyingTheStatus('protection').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theReinforceSkill.shouldNotAffectTheDefender();
  });
});
