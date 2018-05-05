import { counter } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('vengeance', () => {
  let vengeance = whenTriggered(counter);

  describe('effects', () => {
    vengeance.shouldAffectTheAttacker
      .dealingDamage.equalToItsValue()
      //TODO: Add ModifiedBy
      .and.affectNoOtherStatuses();

    vengeance.shouldNotAffectTheDefender();
  });
});
