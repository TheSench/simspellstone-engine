import { theTurnSkill } from '../../skillTestCommon/triggeredSkillBase.spec';
import { regenerate } from './../../skills';

describe('regenerate', () => {
    let theRegenerateSkill = theTurnSkill(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldAffectTheUnit
          .shouldHealDamage.equalToItsValue()
          .and.shouldAffectNoOtherStatuses();
    });
});
