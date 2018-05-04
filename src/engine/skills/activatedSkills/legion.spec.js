import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { legion } from './../skills';

describe('legion', () => {
    let theLegionSkill = theSkill(legion);

    theLegionSkill.shouldOnlyAffect.targetsThatAreActive();
    theLegionSkill.shouldTarget.adjacentAlliedUnits();

    describe('effects', () => {
        theLegionSkill.shouldApplyTheStatus('attackEmpower').stackingWithCurrentValue();
        theLegionSkill.shouldBeNegatedBy.nullified();
    });
});
