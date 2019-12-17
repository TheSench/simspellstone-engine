import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { reinforce } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('reinforce', () => {
  let theReinforceSkill = theCombatSkill(reinforce);

  describe('effects', () => {
    theReinforceSkill.givenTheAttacker
      .shouldAffectTheStatus('protection').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theReinforceSkill.shouldNotAffectTheDefender();
  });
});
