import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { daze } from './../../skills';

describe('daze', () => {
    let theDazeSkill = theSkill(daze);

    describe('effects', () => {
        theDazeSkill.shouldOnlyAffectTheStatus('attackWeaken').stackingWithCurrentValue();
    });
});
