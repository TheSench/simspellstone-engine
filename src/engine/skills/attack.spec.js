import { attack } from './skills';
import { testTargetting, testDamage, testNegation, testPotentialTargets } from './skillTestCommon/skillCommon.spec';

describe('attack', () => {
    testTargetting(attack);
    testPotentialTargets.directlyOpposingOrCommander(attack);

    describe('effects', () => {
        testDamage(attack, {warded: false, armored: true});
        testNegation(attack, null);
    });
});
