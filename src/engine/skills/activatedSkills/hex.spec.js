import { enfeeble as hex } from './../skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './../skillTestCommon/skillCommon.spec';

describe('hex', () => {
    testTargetting(hex);
    testPotentialTargets.allOpposing(hex);

    describe('effects', () => {
        testStatusApplication(hex, 'hexed', true);
        testNegation(hex, 'invisible');
    });
});
