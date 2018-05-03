import { expect } from 'chai';
import states from './../../unitFactory/unitStates';
import { createTestUnit } from './../../unitFactory/unitFactory';

// TODO: Break this monstrosity down into smaller modules

export function testTargetting(skill, targeting) {
  const units = {
    active: createTestUnit({ state: states.active, status: { healthLeft: 5 } }),
    activeNextTurn: createTestUnit({ state: states.activeNextTurn, status: { healthLeft: 5 } }),
    inactive: createTestUnit({ state: states.inactive, status: { healthLeft: 5 } }),
    frozen: createTestUnit({ state: states.frozen, status: { healthLeft: 5 } }),
    dead: createTestUnit({ state: states.dead, status: { healthLeft: 5 } }),
    weakened: createTestUnit({ state: states.weakened, status: { healthLeft: 5 } })
  };

  const stateNames = ['active', 'activeNextTurn', 'inactive', 'frozen', 'dead', 'weakened'];
  const notDead = stateNames.filter((name) => name !== 'dead');
  const allUnits = [units.active, units.activeNextTurn, units.inactive, units.frozen, units.dead, units.weakened];

  let targetableStatesSingle;
  let targetableStatesAll;
  if (!targeting) {
    targetableStatesSingle = targetableStatesAll = notDead;
  } else if (Array.isArray(targeting)) {
    targetableStatesSingle = targeting;
    // Default to ALL targetting any live unit to ensure nullify/invisible get cleared
    targetableStatesAll = notDead;
  } else {
    targetableStatesSingle = targeting.single;
    targetableStatesAll = targeting.all;
  }

  describe('targetting', () => {
    const allStatesDesc = targetableStatesAll.map((state, i, states) => {
      return (!i ? ''
        : i === states.length - 1
          ? ' or '
          : ', ') + state;
    });

    it(`should target ${allStatesDesc} units when targetting ALL`, () => {
      let actualTargets = skill.getFilteredTargets({ all: true }, allUnits);
      // TODO: Should only target active units
      let expectedTargets = targetableStatesAll.map((state) => units[state]);

      expect(actualTargets).to.deep.equal(expectedTargets);
    });

    stateNames.forEach((state) => {
      let targetsState = targetableStatesSingle.indexOf(state) >= 0;
      let should = (targetsState ? 'should' : 'should NOT');

      it(`${should} target ${state} units when targetting single unit`, () => {
        let actualTargets = skill.getFilteredTargets({ all: false }, [units[state]]);
        let expectedTargets = (targetsState ? [units[state]] : []);

        expect(actualTargets).to.deep.equal(expectedTargets);
      });
    });
  });
}
