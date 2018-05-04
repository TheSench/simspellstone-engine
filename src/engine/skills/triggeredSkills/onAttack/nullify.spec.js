import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { nullify } from './../../skills';

describe('nullify', () => {
    let theNullifySkill = theSkill(nullify);

    describe('effects', () => {
        theNullifySkill.shouldOnlyAffectTheStatus('nullified').stackingWithCurrentValue();
    });
});
