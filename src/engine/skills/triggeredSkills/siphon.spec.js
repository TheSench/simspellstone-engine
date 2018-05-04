import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { leech } from './../skills';

describe('siphon', () => {
    let siphon = theSkill(leech);

    describe('effects', () => {
        siphon.shouldHealDamage.equalToItsValue();
        siphon.shouldNotAffectStatusesOtherThan('healthLeft');
    });
});
