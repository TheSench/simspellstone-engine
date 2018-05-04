import { absorb as ward } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('ward', () => {
    describe('effects', () => {
        testStatusApplication(ward, 'warded', true);
    });
});
