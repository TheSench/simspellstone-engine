import { expect } from 'chai';
import { jam as freeze } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus, createTestUnit } from './../unitFactory/unitFactory';
import { testTargetting, testNegation } from './skillCommon.spec';

describe('freeze', () => {
    testTargetting(freeze, ['active', 'activeNextTurn', 'weakened']);

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT invisible', () => {
            let target;
            let affected;

            beforeEach(() => {
                target = createTestUnit({ healthLeft: 5, timer: 0 });
                affected = freeze.affectTarget(null, null, target, null);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should NOT modify any status fields', () => {
                let expectedStatus = Object.assign({}, baseStatus);

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });

            it('should change state to frozen', () => {
                expect(target.state, "target.state").to.equal(states.frozen);
            });
        });

        testNegation(freeze, 'invisible');
    });
});
