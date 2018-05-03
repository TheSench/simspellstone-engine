import { barrage } from './skills';
import { testTargetting, testDamage, testNegation, testPotentialTargets } from './skillTestCommon/skillCommon.spec';

describe('barrage', () => {
    testTargetting(barrage, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);
    testPotentialTargets.allOpposing(barrage);

    describe('effects', () => {
        testDamage(barrage, {hexed: false});
        testNegation(barrage, 'invisible');
    });

    // TODO: Test Barrage firing multiple times
});
