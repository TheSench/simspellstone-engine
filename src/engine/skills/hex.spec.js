import { enfeeble as hex } from './skills';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('hex', () => {
    testTargetting(hex);

    describe('effects', () => {
        testStatusApplication(hex, 'hexed', true);
        testNegation(hex, 'invisible');
    });
});
