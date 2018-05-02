import { expect } from 'chai';
import { strike as bolt } from './skills';
import states from './../unitFactory/unitStates';
import { createStatus, createTestUnit } from './../unitFactory/unitFactory';
import { testNegation } from './skillCommon.spec';

describe('bolt', () => {
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
            let actualTargets = bolt.getTargets(skill, allUnits);
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
                target = createTestUnit({ healthLeft: 5, timer: 0 });
                affected = bolt.affectTarget(skill, null, target, 4);
            });

            it('should affect them', () => {
                expect(affected).to.equal(true);
            });

            it('should remove health equal to its value', () => {
                expect(target.status.healthLeft, "healthLeft").to.equal(1);
            });

            it('should ONLY modify healthLeft', () => {
                let expectedStatus = Object.assign({}, baseStatus, { healthLeft: 1 });

                expect(target.status, "target.status").to.deep.equal(expectedStatus);
            });
        });

        describe("modifying target's state", () => {
            let target;

            beforeEach(() => {
                target = createTestUnit({ healthLeft: 5, timer: 0 });
            });

            it('should NOT mark unit as dead when healthLeft is above 0', () => {
                bolt.affectTarget(skill, null, target, 4);

                expect(target.state.alive, "isAlive").to.be.true;
            });

            it('should mark unit as dead when healthLeft is exactly 0', () => {
                bolt.affectTarget(skill, null, target, 5);

                expect(target.state.alive, "isAlive").to.be.false;
            });

            it('should mark unit as dead when healthLeft is less than 0', () => {
                bolt.affectTarget(skill, null, target, 6);

                expect(target.state.alive, "isAlive").to.be.false;
            });
        });

        describe("interaction with other statuses", () => {

            it('should deal increased damage when unit is hexed', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, hexed: 1 });
                bolt.affectTarget(skill, null, target, 1);

                expect(target.status.healthLeft, "healthLeft").to.equal(3);
            });

            it('should deal decreased damage when unit is warded', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, warded: 1 });
                bolt.affectTarget(skill, null, target, 2);

                expect(target.status.healthLeft, "healthLeft").to.equal(4);
            });

            it('should never deal negative damage due to ward', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, warded: 2 });
                bolt.affectTarget(skill, null, target, 1);

                expect(target.status.healthLeft, "healthLeft").to.equal(5);
            });

            it('should deal increased damage when hexed is greater than warded', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, hexed: 3, warded: 2 });
                bolt.affectTarget(skill, null, target, 1);

                expect(target.status.healthLeft, "healthLeft").to.equal(3);
            });

            it('should deal decreased damage when hexed is less than warded', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, hexed: 2, warded: 3 });
                bolt.affectTarget(skill, null, target, 2);

                expect(target.status.healthLeft, "healthLeft").to.equal(4);
            });

            it('should deal normal damage when hexed is equal to warded', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, hexed: 2, warded: 2 });
                bolt.affectTarget(skill, null, target, 1);

                expect(target.status.healthLeft, "healthLeft").to.equal(4);
            });

            it('should reduce warded', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, warded: 2 });
                bolt.affectTarget(skill, null, target, 1);

                expect(target.status.warded, "warded").to.equal(1);
            });

            it('should never reduce warded below 0', () => {
                let target = createTestUnit({ healthLeft: 5, timer: 0, warded: 1 });
                bolt.affectTarget(skill, null, target, 2);

                expect(target.status.warded, "warded").to.equal(0);
            });
        });

        testNegation('invisible');
    });
});
