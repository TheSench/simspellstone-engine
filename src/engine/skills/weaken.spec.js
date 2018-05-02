import { expect } from 'chai';
import { weaken } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus } from './../unitFactory/unitFactory';
import { testNegation } from './skillCommon.spec';

describe('weaken', () => {
    const activeUnit = { state: states.active };
    const almostActiveUnit = { state: states.activeNextTurn };
    const inactiveUnit = { state: states.inactive };
    const frozenUnit = { state: states.frozen };
    const deadUnit = { state: states.dead };
    const weakenedUnit = { state: states.weakened };

    const allUnits = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, deadUnit, weakenedUnit];

    const skill = { value: 5, all: true };

    describe('targetting', () => {
        it('should target any live units', () => {
            let actualTargets = weaken.getTargets(skill, allUnits);
            // TODO: Should only target active units
            let expectedTargets = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, weakenedUnit];

            expect(actualTargets).to.deep.equal(expectedTargets);
        });
    });

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT invisible', () => {
            let target;
            let affected;

            beforeEach(() => {
                target = {
                    status: Object.assign({}, baseStatus, { attackWeaken: 5})
                };
                affected = weaken.affectTarget(skill, null, target, 5);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should combine with previous attackWeaken', () => {
                expect(target.status.attackWeaken, "attackWeaken").to.equal(10);
            });

            it('should ONLY modify attackWeaken', () => {
                let expectedStatus = Object.assign({}, baseStatus, { attackWeaken: 10 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });

        testNegation('invisible');
    });
});
