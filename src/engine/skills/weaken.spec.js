import { weaken } from './skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './skillTestCommon/skillCommon.spec';

describe('weaken', () => {
    testTargetting(weaken, ['active', 'activeNextTurn']);
    testPotentialTargets.allOpposing(weaken);

    describe('effects', () => {
        testStatusApplication(weaken, 'attackWeaken', true);
        testNegation(weaken, 'invisible');
    });
});
