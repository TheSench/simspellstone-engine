import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { enrage } from './../skills';

describe('enrage', () => {
    let theEnrageSkill = theSkill(enrage);

    theEnrageSkill.shouldOnlyAffect.targetsThatAreAlive();
    theEnrageSkill.shouldTarget.allAlliedUnits();

    describe('effects', () => {
        theEnrageSkill.shouldOnlyAffectTheStatus('enraged').stackingWithCurrentValue(),
        theEnrageSkill.shouldBeNegatedBy.nullified();
    });
});
