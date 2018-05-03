import { nullify } from './../skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './../skillTestCommon/skillCommon.spec';

describe('nullify', () => {
    testTargetting(nullify);
    testPotentialTargets.allOpposing(nullify);

    describe('effects', () => {
        testStatusApplication(nullify, 'nullified', true);
        testNegation(nullify, 'invisible');
    });
});
