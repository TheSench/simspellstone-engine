import { protect } from './skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './skillCommon.spec';

describe('protect', () => {
    testTargetting(protect);
    testPotentialTargets.allAllied(protect);

    describe('effects', () => {
        testStatusApplication(protect, 'protection', true);
        testNegation(protect, 'nullified');
    });
});
