import { expect } from 'chai';
import { protect } from './skills';
import states from './../unitFactory/unitStates';

describe('protect', () => {
    let activeUnit = { state: states.active };
    let almostActiveUnit = { state: states.activeNextTurn };
    let inactiveUnit = { state: states.inactive };
    let frozenUnit = { state: states.frozen };
    let deadUnit = { state: states.dead };
    let weakenedUnit = { state: states.weakened };

    let allUnits = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, deadUnit, weakenedUnit];

    let skill = { id: 'protect', value: 5, all: true };

    it('should target any live units', () => {
        let actualTargets = protect.getTargets(skill, allUnits);
        let expectedTargets = [activeUnit, almostActiveUnit, inactiveUnit, frozenUnit, weakenedUnit];

        expect(actualTargets).to.deep.equal(expectedTargets);
    });
});