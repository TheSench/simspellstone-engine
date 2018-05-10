import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { counter } from './../../skills';

describe('vengeance', () => {
  let vengeance = theCombatSkill(counter);

  describe('effects', () => {
    vengeance.shouldAffectTheAttacker
      .dealingDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.affectNoOtherStatuses();

    vengeance.shouldNotAffectTheDefender();
  });
});
