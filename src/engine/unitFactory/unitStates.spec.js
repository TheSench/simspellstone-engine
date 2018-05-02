import { expect } from 'chai';
import R from 'ramda';
import states from './unitStates';

describe('Unit states', () => {
    describe('state property checks', () => {
        testStateProperties('inactive', {
            willAttack: false,
            active: false,
            alive: true,
            willBeActive: false
        });

        testStateProperties('activeNextTurn', {
            willAttack: true,
            active: false,
            alive: true,
            willBeActive: true
        });

        testStateProperties('active', {
            willAttack: true,
            active: true,
            alive: true,
            willBeActive: true
        });

        testStateProperties('frozen', {
            willAttack: false,
            active: false,
            alive: true,
            willBeActive: false
        });

        testStateProperties('weakened', {
            willAttack: false,
            active: true,
            alive: true,
            willBeActive: true
        });

        testStateProperties('dead', {
            willAttack: false,
            active: false,
            alive: false,
            willBeActive: false
        });
    });

    describe('state transitions', () => {
        testStateTransitions('inactive', {
            activate: 'active',
            activateNextTurn: 'activeNextTurn',
            die: 'dead',
            empower: 'inactive',
            freeze: 'frozen',
            revive: 'inactive',
            unfreeze: 'inactive',
            weaken: 'inactive'
        });

        testStateTransitions('activeNextTurn', {
            activate: 'active',
            activateNextTurn: 'activeNextTurn',
            die: 'dead',
            empower: 'activeNextTurn',
            freeze: 'frozen',
            revive: 'activeNextTurn',
            unfreeze: 'activeNextTurn',
            weaken: 'activeNextTurn'
        });

        testStateTransitions('active', {
            activate: 'active',
            activateNextTurn: 'activeNextTurn',
            die: 'dead',
            empower: 'active',
            freeze: 'frozen',
            revive: 'active',
            unfreeze: 'active',
            weaken: 'weakened'
        });

        testStateTransitions('frozen', {
            activate: 'frozen',
            activateNextTurn: 'frozen',
            die: 'dead',
            empower: 'frozen',
            freeze: 'frozen',
            revive: 'frozen',
            unfreeze: {
                0: 'active',
                1: 'activeNextTurn',
                other: 'inactive'
            },
            weaken: 'frozen'
        });

        testStateTransitions('weakened', {
            activate: 'weakened',
            activateNextTurn: 'weakened',
            empower: {
                0: 'active',
                1: 'activeNextTurn',
                other: 'inactive'
            },
            die: 'dead',
            freeze: 'frozen',
            unfreeze: 'weakened',
            weaken: 'weakened'
        });

        testStateTransitions('dead', {
            activate: 'dead',
            activateNextTurn: 'dead',
            die: 'dead',
            empower: 'dead',
            freeze: 'dead',
            revive: {
                0: 'active',
                1: 'activeNextTurn',
                other: 'inactive'
            },
            unfreeze: 'dead',
            weaken: 'dead'
        });
    });
});

function testStateProperties(stateName, expectations) {
    describe(`${stateName} state`, () => {
        let state = states[stateName];

        R.toPairs(expectations).forEach(([what, expectedValue]) => {
            let shouldBe = `${what} should ${(expectedValue ? '' : 'NOT ')}be true`;

            it(shouldBe, () => {
                let actualValue = state[what];

                expect(actualValue).to.be[expectedValue];
            });
        });

        it('should have the correct name', () => {
            expect(state.name).to.equal(stateName);
        });
    });
}

function testStateTransitions(stateName, expectations) {
    describe(`${stateName} state`, () => {
        let state = states[stateName];

        [0, 1, 2, undefined].forEach((timer) => {
            R.toPairs(expectations).forEach(([transition, expectedValue]) => {
                let expectedStateName = (typeof expectedValue === "string" ? expectedValue : (expectedValue[timer] || expectedValue.other));
                let shouldBe = `${transition} should return the ${expectedStateName} state`;

                it(shouldBe, () => {
                    let newState = state[transition](timer);
                    let expectedState = states[expectedStateName];

                    expect(newState.name).to.equal(expectedState.name);
                });
            });
        });
    });
}
