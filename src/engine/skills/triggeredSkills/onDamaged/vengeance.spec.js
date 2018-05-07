import { whenTriggered } from '../testCombatSkill.spec';
import { counter } from './../../skills';

describe('vengeance', () => {
  let vengeance = whenTriggered(counter);

  describe('effects', () => {
    vengeance.shouldAffectTheAttacker
      .dealingDamage.equalToItsValue()
      .modifiedBy('protection', 'warded')
      .and.affectNoOtherStatuses();

    vengeance.shouldNotAffectTheDefender();
  });
});
