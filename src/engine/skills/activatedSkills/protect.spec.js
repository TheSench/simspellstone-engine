import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { protect } from './../skills';

describe('protect', () => {
    let barrier = theSkill(protect);

    barrier.shouldTarget.allAlliedUnits();
    barrier.shouldOnlyAffect.targetsThatAreAlive();

    describe('effects', () => {
        barrier.shouldApplyTheStatus('protection').stackingWithCurrentValue();
        barrier.shouldBeNegatedBy.nullified();
    });
});
