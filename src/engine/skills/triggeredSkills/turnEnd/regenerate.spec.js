import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { regenerate } from './../../skills';
import { default as describeSkill } from './turnEnd.spec';

describeSkill('regenerate', () => {
    let theRegenerateSkill = theTurnSkill(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldAffectTheUnit
          .shouldHealDamage.equalToItsValue()
          .and.shouldAffectNoOtherStatuses();
    });
});
