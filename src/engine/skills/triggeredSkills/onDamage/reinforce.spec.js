import { reinforce } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('reinforce', () => {
    describe('effects', () => {
        testStatusApplication(reinforce, 'protection', true);
    });
});
