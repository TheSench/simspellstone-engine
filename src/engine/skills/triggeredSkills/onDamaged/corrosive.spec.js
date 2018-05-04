import { expect } from 'chai';
import { corrosive } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';
import { createTestUnit } from '../../../unitFactory/unitFactory';

describe('corrosive', () => {
    describe('effects', () => {
        testStatusApplication(corrosive, 'attackCorroded', true, true);
        testStatusApplication(corrosive, 'corroded', true, true);

        it(`should set corrodedTimer to 2`, () => {
            let target = createTestUnit();

            corrosive.affectTarget(null, null, target, 5);

            expect(target.status.corrodedTimer, 'corrodedTimer').to.equal(2);
        });

        it(`should always reset corrodedTimer to 2`, () => {
            let target = createTestUnit({ status: { corrodedTimer: 5 } });

            corrosive.affectTarget(null, null, target, 5);

            expect(target.status.corrodedTimer, 'corrodedTimer').to.equal(2);
        });

        it(`should ONLY modify attackCorroded, corroded and corrodedTimer`, () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { attackCorroded: 5, corroded: 5, corrodedTimer: 2, });

            corrosive.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
    });
});
