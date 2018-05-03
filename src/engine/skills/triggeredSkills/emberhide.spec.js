import { expect } from 'chai';
import { counterburn as emberhide } from './../skills';
import { testStatusApplication } from './../skillTestCommon/skillCommon.spec';
import { createTestUnit } from '../../unitFactory/unitFactory';

describe('emberhide', () => {
    describe('effects', () => {
        testStatusApplication(emberhide, 'scorched', true, true);

        it(`should set scorchTimer to 2`, () => {
            let target = createTestUnit();

            emberhide.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should always reset scorchTimer to 2`, () => {
            let target = createTestUnit({ status: { scorchTimer: 5 } });

            emberhide.affectTarget(null, null, target, 5);

            expect(target.status.scorchTimer, 'scorchTimer').to.equal(2);
        });

        it(`should ONLY modify scorch and scorchTimer`, () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { scorched: 5, scorchTimer: 2 });

            emberhide.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
    });
});
