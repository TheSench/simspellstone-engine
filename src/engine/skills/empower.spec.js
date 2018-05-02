import { rally as empower } from './skills';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('empower', () => {
    testTargetting(empower, ['active', 'weakened']);

    describe('effects', () => {
        testStatusApplication(empower, 'attackEmpower', true);
        testNegation(empower, 'nullified');
    });
});
