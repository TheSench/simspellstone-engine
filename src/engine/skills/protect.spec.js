import { expect } from 'chai';
import { protect } from './skills';
import { createStatus } from './../unitFactory/unitFactory';
import { testTargetting, testNegation } from './skillCommon.spec';

describe('protect', () => {
    testTargetting(protect);

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT nullified', () => {
            let target;
            let affected;

            beforeEach(() => {
                target = {
                    status: Object.assign({}, baseStatus, { protected: 5 })
                };
                affected = protect.affectTarget(null, null, target, 5);
            });

            it('should affect them', () => {
                expect(affected).to.be.true;
            });

            it('should combine with previous protect', () => {
                expect(target.status.protected, "protected").to.equal(10);
            });

            it('should ONLY modify protected', () => {
                let expectedStatus = Object.assign({}, baseStatus, { protected: 10 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });

        testNegation(protect, 'nullified');
    });
});
