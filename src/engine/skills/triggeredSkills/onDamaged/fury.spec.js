import { fury } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('fury', () => {
  let theFurySkill = whenTriggered(fury);

  describe('effects', () => {
    theFurySkill.shouldAffectTheAttacker
      .dealingDamage.equalToItsValue()
      //TODO: Add ModifiedBy
      .and.affectNoOtherStatuses();

    theFurySkill.shouldAffectTheDefender
      .applyingTheStatus('attackBerserk').stackingWithCurrentValue()
      .and.affectNoOtherStatuses();
  });
});
