import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { counter } from './../../skills';

describe('vengeance', () => {
    let vengeance = theSkill(counter);

    describe('effects', () => {
        vengeance.shouldDealDamage
            .equalToItsValue()
            .modifiedBy('protection', 'warded');

        vengeance.shouldNotAffectStatusesOtherThan('healthLeft');
    });
});
