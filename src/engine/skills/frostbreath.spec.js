import { frost as frostbreath } from './skills';
import { testTargetting, testDamage, testNegation, testPotentialTargets } from './skillCommon.spec';

describe('frostbreath', () => {
    testTargetting(frostbreath, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);
    testPotentialTargets.cone(frostbreath);

    describe('effects', () => {
        testDamage(frostbreath);
        testNegation(frostbreath, 'invisible');
    });
});
