import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { absorb as ward } from './../skills';

describe('invisibility', () => {
    let theWardSkill = theSkill(ward);

    describe('effects', () => {
        theWardSkill.shouldOnlyAffectTheStatus('warded').stackingWithCurrentValue();
    });
});
