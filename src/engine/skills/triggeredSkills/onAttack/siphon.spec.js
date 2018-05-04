import { leech as siphon } from './../../skills';
import { testHealing } from './../../skillTestCommon/skillCommon.spec';

describe('siphon', () => {
    describe('effects', () => {
        testHealing(siphon);
    });
});
