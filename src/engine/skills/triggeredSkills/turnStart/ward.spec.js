import { theSkill } from './../../skillTestCommon/skillCommon.spec';
import { absorb } from './../../skills';

describe('ward', () => {
    let ward = theSkill(absorb);

    describe('effects', () => {
        ward.shouldOnlyAffectTheStatus("warded");
    });
});
