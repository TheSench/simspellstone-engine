import { whenTriggered } from '../testCombatSkill.spec';
import { fury } from './../../skills';

describe('fury', () => {
  let theFurySkill = whenTriggered(fury);

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
