import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { counter } from './../../skills';
import { default as describeSkill } from './onDamaged.spec';

describeSkill('vengeance', () => {
  let vengeance = theCombatSkill(counter);

  describe('effects', () => {
    vengeance.givenTheAttacker
      .shouldDealDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.shouldAffectNoOtherStatuses();

    vengeance.shouldNotAffectTheDefender();
  });
});
