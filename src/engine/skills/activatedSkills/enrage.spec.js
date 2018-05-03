import { enrage } from './../skills';
import { testTargetting, testStatusApplication, testNegation, testPotentialTargets } from './../skillTestCommon/skillCommon.spec';

describe('enrage', () => {
    testTargetting(enrage);
    testPotentialTargets.allAllied(enrage);

    describe('effects', () => {
        testStatusApplication(enrage, 'enraged', true);
        testNegation(enrage, 'nullified');
    });
});
