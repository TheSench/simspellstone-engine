import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { fury } from './../../skills';

describe('fury', () => {
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
