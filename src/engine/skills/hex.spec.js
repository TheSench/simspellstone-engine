import { expect } from 'chai';
import { enfeeble as hex } from './skills';
import { createStatus } from './../unitFactory/unitFactory';
import { testTargetting, testNegation } from './skillCommon.spec';

describe('hex', () => {
    testTargetting(hex);

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT invisible', () => {
            let target;
            let affected;

            beforeEach(() => {
                target = {
                    status: Object.assign({}, baseStatus, { hexed: 5})
                };
                affected = hex.affectTarget(null, null, target, 5);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should combine with previous hex', () => {
                expect(target.status.hexed, "hexed").to.equal(10);
            });

            it('should ONLY modify hexed', () => {
                let expectedStatus = Object.assign({}, baseStatus, { hexed: 10 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });

        testNegation(hex, 'invisible');
    });
});
