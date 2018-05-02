import { protect } from './skills';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('protect', () => {
    testTargetting(protect);

    describe('effects', () => {
        testStatusApplication(protect, 'protected', true);
        testNegation(protect, 'nullified');
    });
});
