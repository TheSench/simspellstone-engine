import { expect } from 'chai';
import R from 'ramda';
import states from './unitStates';

describe('Unit states', () => {
    describe('state property checks', () => {
        testStateProperties('inactive', {
            canAttack: false,
            active: false,
            alive: true,
            willBeActive: false
        });

        testStateProperties('activeNextTurn', {
            canAttack: false,
            active: false,
            alive: true,
            willBeActive: true
        });

        testStateProperties('active', {
            canAttack: true,
            active: true,
            alive: true,
            willBeActive: true
        });

        testStateProperties('frozen', {
            canAttack: false,
            active: false,
            alive: true,
            willBeActive: false
        });

        testStateProperties('weakened', {
            canAttack: false,
            active: true,
            alive: true,
            willBeActive: true
        });

        testStateProperties('dead', {
            canAttack: false,
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
            freeze: 'frozen',
            revive: 'inactive',
            unFreeze: 'inactive',
            weaken: 'inactive'
        });

        testStateTransitions('activeNextTurn', {
            activate: 'active',
            activateNextTurn: 'activeNextTurn',
            die: 'dead',
            freeze: 'frozen',
            revive: 'activeNextTurn',
            unFreeze: 'activeNextTurn',
            weaken: 'activeNextTurn'
        });

        testStateTransitions('active', {
            activate: 'active',
            activateNextTurn: 'activeNextTurn',
            die: 'dead',
            freeze: 'frozen',
            revive: 'active',
            unFreeze: 'active',
            weaken: 'weakened'
        });

        testStateTransitions('frozen', {
            activate: 'frozen',
            activateNextTurn: 'frozen',
            die: 'dead',
            freeze: 'frozen',
            revive: 'frozen',
            unFreeze: 'active',
            weaken: 'frozen'
        });

        testStateTransitions('weakened', {
            activate: 'weakened',
            activateNextTurn: 'weakened',
            die: 'dead',
            freeze: 'frozen',
            unFreeze: 'weakened',
            weaken: 'weakened'
        });

        testStateTransitions('dead', {
            activate: 'dead',
            activateNextTurn: 'dead',
            die: 'dead',
            freeze: 'dead',
            revive: 'inactive',
            unFreeze: 'dead',
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

        R.toPairs(expectations).forEach(([what, expectedValue]) => {
            let shouldBe = `${what} should return the ${expectedValue} state`;

            it(shouldBe, () => {
                let newState = state[what]();
                let expectedState = states[expectedValue];

                expect(newState.name).to.equal(expectedState.name);
            });
        });
    });
}
