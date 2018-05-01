import { expect } from 'chai';
import { protect } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus } from './../unitFactory/unitFactory';

describe('protect', () => {
    const activeUnit = { state: states.active };
    const almostActiveUnit = { state: states.activeNextTurn };
    const inactiveUnit = { state: states.inactive };
    const frozenUnit = { state: states.frozen };
    const deadUnit = { state: states.dead };
    const weakenedUnit = { state: states.weakened };

    const allUnits = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, deadUnit, weakenedUnit];

    const skill = { id: 'protect', value: 5, all: true };

    describe('targetting', () => {
        it('should target any live units', () => {
            let actualTargets = protect.getTargets(skill, allUnits);
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
                    status: Object.assign({}, baseStatus, { protected: 5 })
                };
                affected = protect.affectTarget(skill, null, target, 5);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should combine with previous protect', () => {
                expect(target.status.protected, "protected").to.deep.equal(10);
            });

            it('should only modify the protected status', () => {
                let expectedStatus = Object.assign({}, baseStatus, { protected: 10 });

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
                affected = protect.affectTarget(skill, null, target, 5);
            });

            it('should NOT affect them', () => {
                expect(affected).to.equal(false);
            });

            it('should decrement nullified', () => {
                expect(target.status.nullified, "protected").to.deep.equal(4);
            });

            it('should only modify the nullified status', () => {
                let expectedStatus = Object.assign({}, baseStatus, { nullified: 4 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });
    });
});