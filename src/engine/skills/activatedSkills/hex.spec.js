import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { enfeeble } from './../skills';

describe('hex', () => {
    let hex = theSkill(enfeeble);

    hex.shouldTarget.allOpposingUnits();
    hex.shouldOnlyAffect.targetsThatAreAlive();

    describe('effects', () => {
        hex.shouldApplyTheStatus('hexed').stackingWithCurrentValue();
        hex.shouldBeNegatedBy.invisible();
    });
});
