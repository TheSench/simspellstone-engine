import { regenerate } from './../../skills';
import { testHealing } from './../../skillTestCommon/skillCommon.spec';

describe('regenerate', () => {
    describe('effects', () => {
        testHealing(regenerate);
    });
});
