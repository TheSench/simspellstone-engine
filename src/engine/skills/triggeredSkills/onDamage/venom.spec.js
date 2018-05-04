import { expect } from 'chai';
import { venom } from './../../skills';
import { testStatusApplication } from './../../skillTestCommon/skillCommon.spec';
import { createTestUnit } from '../../../unitFactory/unitFactory';

describe('venom', () => {
    describe('effects', () => {
        testStatusApplication(venom, 'envenomed', false, true);
        testStatusApplication(venom, 'hexed', true, true);

        it(`should ONLY modify envenomed and hexed`, () => {
            let target = createTestUnit();
            let expectedStatus = Object.assign({}, target.status, { envenomed: 5, hexed: 5, });

            venom.affectTarget(null, null, target, 5);

            expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
    });
});
