import { expect } from 'chai';
import { createTestUnit } from './../unitFactory/unitFactory';
import { burn as scorch } from './skills';
import { testTargetting, testStatusApplication, testNegation, testPotentialTargets } from './skillCommon.spec';

describe('scorch', () => {
    testTargetting(scorch);
    testPotentialTargets.directlyOpposing(scorch);

    describe('effects', () => {
        testStatusApplication(scorch, 'scorched', true, true);

        it(`should set scorchTimer to 2`, () => {
            let target = createTestUnit();

            scorch.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should always reset scorchTimer to 2`, () => {
            let target = createTestUnit({ status: { scorchTimer: 5 } });

            scorch.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        testNegation(scorch);
    });
});
