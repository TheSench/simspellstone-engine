import { fury } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';

describe('fury', () => {
    describe('effects', () => {
        testStatusApplication(fury, 'attackBerserk', true);
    });
});
