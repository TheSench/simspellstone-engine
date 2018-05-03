import { weaken, weakenself as weakenSelf } from './../skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './../skillTestCommon/skillCommon.spec';

describe('weaken', () => {
    testWeakenBase(weaken);
    testPotentialTargets.allOpposing(weaken);
});
describe('weakenSelf', () => {
    testWeakenBase(weakenSelf);
    testPotentialTargets.self(weakenSelf);
});

function testWeakenBase(weakenSkill) {
    testTargetting(weakenSkill, ['active', 'activeNextTurn']);

    describe('effects', () => {
        testStatusApplication(weakenSkill, 'attackWeaken', true);
        testNegation(weakenSkill, 'invisible');
    });
}