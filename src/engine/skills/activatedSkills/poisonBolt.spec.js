import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';
import { poisonstrike as poisonBolt } from './../skills';
import { testTargetting, testDamage, testStatusApplication, testNegation, testPotentialTargets } from './../skillTestCommon/skillCommon.spec';

describe('bolt', () => {
    testTargetting(poisonBolt, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']);
    testPotentialTargets.allOpposing(poisonBolt);

    describe('effects', () => {
        testDamage(poisonBolt, null, true);
        testStatusApplication(poisonBolt, 'poisoned', false, true);
        testNegation(poisonBolt, 'invisible');

        it('should ONLY modify healthLeft and poisoned', () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { healthLeft: 5, poisoned: 5 });

            poisonBolt.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
    });
});
