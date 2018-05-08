import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { enlarge } from './../skills';

describe('enlarge', () => {
    let theEnlargeSkill = theSkill(enlarge);
    
    theEnlargeSkill.shouldTarget.allAlliedUnits();
    theEnlargeSkill.shouldOnlyAffect.targetsThatAreActive();

    describe('effects', () => {
        theEnlargeSkill.shouldOnlyAffectTheStatus('attackEmpower').stackingWithCurrentValue();
        theEnlargeSkill.shouldBeNegatedBy.nothing();
    });
});