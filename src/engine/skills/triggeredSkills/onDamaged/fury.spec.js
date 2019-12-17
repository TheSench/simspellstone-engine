import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { fury } from './../../skills';
import { default as describeSkill } from './onDamaged.spec';

describeSkill('fury', () => {
  let theFurySkill = theCombatSkill(fury);

  describe('effects', () => {
    theFurySkill.givenTheAttacker
      .shouldDealDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.shouldAffectNoOtherStatuses();

    theFurySkill.givenTheDefender
      .shouldAffectTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.shouldAffectNoOtherStatuses();
  });
});
