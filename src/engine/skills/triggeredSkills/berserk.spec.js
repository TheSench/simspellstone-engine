import { berserk } from './../skills';
import { testStatusApplication } from './../skillTestCommon/skillCommon.spec';

describe('berserk', () => {
    describe('effects', () => {
        testStatusApplication(berserk, 'attackBerserk', true);
    });
});
