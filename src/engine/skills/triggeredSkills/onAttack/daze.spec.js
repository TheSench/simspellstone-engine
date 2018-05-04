import { daze } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('daze', () => {
    describe('effects', () => {
        testStatusApplication(daze, 'attackWeaken', true);
    });
});
