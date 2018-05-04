import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { poison } from './../../skills';

describe('poison', () => {
    let thePoison = theSkill(poison);

    describe('effects', () => {
        thePoison.shouldOnlyAffectTheStatus('poisoned').keepingHighestValue();
    });
});
