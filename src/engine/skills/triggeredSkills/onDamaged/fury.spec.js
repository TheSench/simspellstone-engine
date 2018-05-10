import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { fury } from './../../skills';

describe('fury', () => {
  let theFurySkill = theCombatSkill(fury);

  describe('effects', () => {
    theFurySkill.shouldAffectTheAttacker
      .dealingDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.affectNoOtherStatuses();

    theFurySkill.shouldAffectTheDefender
      .applyingTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
