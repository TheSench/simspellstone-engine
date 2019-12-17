import { theCombatSkill } from '../../skillTestCommon/skillTestBase.spec';
import { leech } from './../../skills';
import { default as describeSkill } from './onAttack.spec';

describeSkill('siphon', () => {
    let siphon = theCombatSkill(leech);

    describe('effects', () => {
        siphon.givenTheAttacker
            .shouldHealDamage.equalToItsValue()
            .and.shouldAffectNoOtherStatuses();

        siphon.shouldNotAffectTheDefender();
    });
});
