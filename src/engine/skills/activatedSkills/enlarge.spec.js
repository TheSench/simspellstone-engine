import { enlarge } from './../skills';
import { testTargetting, testStatusApplication, testNegation, testPotentialTargets } from './../skillTestCommon/skillCommon.spec';

describe('enlarge', () => {
    testTargetting(enlarge, ['active', 'weakened']);
    testPotentialTargets.allAllied(enlarge);

    describe('effects', () => {
        testStatusApplication(enlarge, 'attackEmpower', true);
        testNegation(enlarge, null);
    });
});
