import { whenTriggered } from '../testCombatSkill.spec';
import { counterburn } from './../../skills';

describe('emberhide', () => {
  let emberhide = whenTriggered(counterburn);

  describe('effects', () => {
    emberhide.shouldAffectTheAttacker
      .applyingTheStatus('scorched').stackingWithCurrentValue()
      .and.applyingTheStatus('scorchTimer').replacingCurrentValueWith(2)
      .and.affectNoOtherStatuses();

    it('adds scorched to the attacker');

    emberhide.shouldNotAffectTheDefender();
  });
});
