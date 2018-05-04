import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { regenerate } from './../../skills';

describe('regenerate', () => {
    let theRegenerateSkill = theSkill(regenerate);

    describe('effects', () => {
        theRegenerateSkill.shouldHealDamage.equalToItsValue();
        theRegenerateSkill.shouldNotAffectStatusesOtherThan('healthLeft');
    });
});
