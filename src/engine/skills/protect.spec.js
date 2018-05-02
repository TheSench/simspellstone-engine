import { protect } from './skills';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('protect', () => {
    testTargetting(protect);

    describe('effects', () => {
        testStatusApplication(protect, 'protection', true);
        testNegation(protect, 'nullified');
    });
});
