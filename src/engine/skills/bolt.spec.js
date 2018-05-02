import { strike as bolt } from './skills';
import { testTargetting, testDamage, testNegation, testPotentialTargets } from './skillCommon.spec';

describe('bolt', () => {
    testTargetting(bolt, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);
    testPotentialTargets.allOpposing(bolt);

    describe('effects', () => {
        testDamage(bolt);
        testNegation(bolt, 'invisible');
    });
});
