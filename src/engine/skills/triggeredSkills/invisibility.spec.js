import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { evade } from './../skills';

describe('invisibility', () => {
    let invisibility = theSkill(evade);

    describe('effects', () => {
        invisibility.shouldOnlyAffectTheStatus('invisible').stackingWithCurrentValue();
    });
});
