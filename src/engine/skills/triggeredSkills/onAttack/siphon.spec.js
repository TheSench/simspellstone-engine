import { leech } from './../../skills';
import { whenTriggered } from '../testCombatSkill.spec';

describe('siphon', () => {
    let siphon = whenTriggered(leech);

    describe('effects', () => {
        siphon.shouldAffectTheAttacker.healingDamage.equalToItsValue()
          .and.affectNoOtherStatuses();

        siphon.shouldNotAffectTheDefender();
    });
});
