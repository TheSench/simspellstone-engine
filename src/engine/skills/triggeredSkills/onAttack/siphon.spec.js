import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { leech } from './../../skills';

describe('siphon', () => {
    let siphon = theCombatSkill(leech);

    describe('effects', () => {
        siphon.givenTheAttacker
            .shouldHealDamage.equalToItsValue()
            .and.shouldAffectNoOtherStatuses();

        siphon.shouldNotAffectTheDefender();
    });
});
