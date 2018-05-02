import { expect } from 'chai';
import { rally as empower } from './skills';
import { createStatus } from './../unitFactory/unitFactory';
import { testTargetting, testNegation } from './skillCommon.spec';

describe('empower', () => {
    testTargetting(empower, ['active', 'weakened']);

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT nullified', () => {
            let target;
            let affected;

            beforeEach(() => {
                target = {
                    status: Object.assign({}, baseStatus, { attackEmpower: 5})
                };
                affected = empower.affectTarget(null, null, target, 5);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should combine with previous attackEmpower', () => {
                expect(target.status.attackEmpower, "attackEmpower").to.equal(10);
            });

            it('should ONLY modify attackEmpower', () => {
                let expectedStatus = Object.assign({}, baseStatus, { attackEmpower: 10 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });

        testNegation(empower, 'nullified');
    });
});
