import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { counterburn } from './../../skills';
import { default as describeSkill } from './onDamaged.spec';

describeSkill('emberhide', () => {
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
