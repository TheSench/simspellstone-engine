import { weaken } from './skills';
import { testTargetting, testStatusApplication, testNegation } from './skillCommon.spec';

describe('weaken', () => {
    testTargetting(weaken, ['active', 'activeNextTurn']);

    describe('effects', () => {
        testStatusApplication(weaken, 'attackWeaken', true);
        testNegation(weaken, 'invisible');
    });
});
