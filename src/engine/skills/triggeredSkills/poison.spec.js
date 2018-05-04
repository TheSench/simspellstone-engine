import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { poison } from './../skills';

describe('poison', () => {
    let thePoisonSkill = theSkill(poison);

    describe('effects', () => {
        thePoisonSkill.shouldOnlyAffectTheStatus('poisoned').keepingHighestValue();
    });
});
