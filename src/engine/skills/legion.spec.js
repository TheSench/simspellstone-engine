import { legion } from './skills';
import { testTargetting, testStatusApplication, testNegation, testPotentialTargets } from './skillTestCommon/skillCommon.spec';

describe('legion', () => {
    testTargetting(legion, ['active', 'weakened']);
    testPotentialTargets.adjacentAllied(legion);

    describe('effects', () => {
        testStatusApplication(legion, 'attackEmpower', true);
        testNegation(legion, 'nullified');
    });
});
