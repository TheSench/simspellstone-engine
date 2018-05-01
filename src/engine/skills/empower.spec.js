import { expect } from 'chai';
import { rally as empower } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus } from './../unitFactory/unitFactory';

describe('empower', () => {
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
            let actualTargets = empower.getTargets(skill, allUnits);
            let expectedTargets = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, weakenedUnit];

            expect(actualTargets).to.deep.equal(expectedTargets);
        });
    });

    describe('effects', () => {
        const baseStatus = createStatus({ health: 5, cost: 0 });

        describe('when targetting units that are NOT nullified', () => {
            let target;
            let affected;
            
            beforeEach(() => {
                target = { 
                    status: Object.assign({}, baseStatus, { attackEmpower: 5})
                };
                affected = empower.affectTarget(skill, null, target, 5);
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

        describe('when targetting units that are nullified', () => {
            let target;
            let affected;
            
            beforeEach(() => {
                target = { 
                    status: Object.assign({}, baseStatus, { nullified: 5 })
                };
                affected = empower.affectTarget(skill, null, target, 5);
            });

            it('should NOT affect them', () => {
                expect(affected).to.equal(false);
            });

            it('should decrement nullified', () => {
                expect(target.status.nullified, "nullified").to.equal(4);
            });

            it('should ONLY modify nullified', () => {
                let expectedStatus = Object.assign({}, baseStatus, { nullified: 4 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });
    });
});