import { frost as frostbreath } from './skills';
import { testTargetting, testDamage, testNegation } from './skillCommon.spec';

describe('frostbreath', () => {
    testTargetting(frostbreath, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);

    describe('effects', () => {
        testDamage(frostbreath);
        testNegation(frostbreath, 'invisible');
    });
});
