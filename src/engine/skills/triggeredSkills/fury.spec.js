import { theSkill } from './../skillTestCommon/skillCommon.spec';
import { fury } from './../skills';

describe('fury', () => {
    let theFurySkill = theSkill(fury);

    describe('effects', () => {
        theFurySkill.shouldOnlyAffectTheStatus('attackBerserk').stackingWithCurrentValue();
        
        it('should damage the attacker');
    });
});
