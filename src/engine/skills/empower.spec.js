import { rally as empower } from './skills';
import { testTargetting, testStatusApplication, testNegation, testPotentialTargets } from './skillCommon.spec';

describe('empower', () => {
    testTargetting(empower, ['active', 'weakened']);
    testPotentialTargets.allAllied(empower);

    describe('effects', () => {
        testStatusApplication(empower, 'attackEmpower', true);
        testNegation(empower, 'nullified');
    });
});
