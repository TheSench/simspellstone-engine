import { strike as bolt } from './skills';
import { testTargetting, testDamage, testNegation } from './skillCommon.spec';

describe('bolt', () => {
    testTargetting(bolt, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);

    describe('effects', () => {
        testDamage(bolt);
        testNegation(bolt, 'invisible');
    });
});
