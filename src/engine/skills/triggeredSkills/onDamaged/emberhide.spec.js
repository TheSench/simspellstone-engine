import { counterburn } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('emberhide', () => {
  let emberhide = whenTriggered(counterburn);

  describe('effects', () => {
    emberhide.shouldAffectTheAttacker
      .applyingTheStatus('scorched').stackingWithCurrentValue()
      .and.applyingTheStatus('scorchTimer').replacingCurrentValueWith(2)
      .and.affectNoOtherStatuses();

    emberhide.shouldNotAffectTheDefender();
  });
});
