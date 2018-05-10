import { theTurnSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { regenerate } from './../../skills';

describe('regenerate', () => {
    let theRegenerateSkill = theTurnSkill(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldAffectTheUnit
          .healingDamage.equalToItsValue()
          .and.affectNoOtherStatuses();
    });
});
