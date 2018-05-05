import { berserk } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('berserk', () => {
  let theBerserkSkill = whenTriggered(berserk);

  describe('effects', () => {
    theBerserkSkill.shouldAffectTheAttacker
      .applyingTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();

    theBerserkSkill.shouldNotAffectTheDefender();
  });
});
