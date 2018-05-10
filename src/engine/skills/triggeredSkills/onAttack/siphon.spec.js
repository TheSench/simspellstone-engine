import { theCombatSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { leech } from './../../skills';

describe('siphon', () => {
    let siphon = theCombatSkill(leech);

    describe('effects', () => {
        siphon.shouldAffectTheAttacker.healingDamage.equalToItsValue()
          .and.affectNoOtherStatuses();

        siphon.shouldNotAffectTheDefender();
    });
});
