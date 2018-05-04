import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { reinforce } from './../skills';

describe('reinforce', () => {
    let theReinforceSkill = theSkill(reinforce);

    describe('effects', () => {
        theReinforceSkill.shouldOnlyAffectTheStatus('protection').stackingWithCurrentValue();
    });
});
