import { expect } from 'chai';
import { createTestUnit } from './../unitFactory/unitFactory';
import { scorchbreath } from './skills';
import { testTargetting, testPotentialTargets, testStatusApplication, testNegation } from './skillTestCommon/skillCommon.spec';

describe('scorchbreath', () => {
    testTargetting(scorchbreath);
    testPotentialTargets.cone(scorchbreath);

    describe('effects', () => {
        testStatusApplication(scorchbreath, 'scorched', true, true);

        it(`should set scorchTimer to 2`, () => {
            let target = createTestUnit();

            scorchbreath.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should always reset scorchTimer to 2`, () => {
            let target = createTestUnit({ status: { scorchTimer: 5 } });

            scorchbreath.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        testNegation(scorchbreath);
    });
});
