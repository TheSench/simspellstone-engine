import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { berserk } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('berserk', () => {
  let theBerserkSkill = theCombatSkill(berserk);

  describe('effects', () => {
    theBerserkSkill.givenTheAttacker
      .shouldAffectTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();

    theBerserkSkill.shouldNotAffectTheDefender();
  });
});
