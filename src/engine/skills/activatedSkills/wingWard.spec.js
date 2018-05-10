import { theSkill } from './../skillTestCommon/activationSkillBase.spec';
import { evadebarrier } from './../skills';

describe('wingWard', () => {
    let wingWard = theSkill(evadebarrier);

    wingWard.shouldTarget.allAlliedUnits();
    wingWard.shouldOnlyAffect.targetsThatAreAlive();

    describe('effects', () => {
        wingWard.shouldApplyTheStatus('protection').stackingWithCurrentValue();
        wingWard.shouldApplyTheStatus('invisible').stackingWithCurrentValue();
        wingWard.shouldNotAffectStatusesOtherThan('protection', 'invisible');

        wingWard.shouldBeNegatedBy.nullified();
    });
});
