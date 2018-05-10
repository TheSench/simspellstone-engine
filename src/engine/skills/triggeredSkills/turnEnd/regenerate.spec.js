import { theTurnSkill } from '../../skillTestsConsolidated/triggeredSkillBase.spec';
import { regenerate } from './../../skills';

describe('regenerate', () => {
    let theRegenerateSkill = theTurnSkill(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldAffectItself
          .healingDamage.equalToItsValue()
          .and.affectNoOtherStatuses();
    });
});
