import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { counterburn } from './../../skills';

describe('emberhide', () => {
  let emberhide = theCombatSkill(counterburn);

  describe('effects', () => {
    emberhide.givenTheAttacker
      .shouldAffectTheStatus('scorched').stackingWithCurrentValue()
      .and.shouldAffectTheStatus('scorchTimer').replacingCurrentValueWith(2)
      .and.shouldAffectNoOtherStatuses();

    it('adds scorched to the attacker');

    emberhide.shouldNotAffectTheDefender();
  });
});
