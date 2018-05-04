import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { berserk } from './../../skills';

describe('berserk', () => {
    let theBerserkSkill = theSkill(berserk);

    describe('effects', () => {
        theBerserkSkill.shouldOnlyAffectTheStatus('attackBerserk').stackingWithCurrentValue();
    });
});
