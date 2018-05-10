import { theCombatSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { counterburn } from './../../skills';

describe('emberhide', () => {
  let emberhide = theCombatSkill(counterburn);

  describe('effects', () => {
    emberhide.shouldAffectTheAttacker
      .applyingTheStatus('scorched').stackingWithCurrentValue()
      .and.applyingTheStatus('scorchTimer').replacingCurrentValueWith(2)
      .and.affectNoOtherStatuses();

    it('adds scorched to the attacker');

    emberhide.shouldNotAffectTheDefender();
  });
});
