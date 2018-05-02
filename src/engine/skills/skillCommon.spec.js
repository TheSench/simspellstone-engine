import { expect } from 'chai';
import states from './../unitFactory/unitStates';
import { createTestUnit } from './../unitFactory/unitFactory';

export function testTargetting(skill, targeting) {
  const units = {
    active: createTestUnit({ state: states.active }),
    activeNextTurn: createTestUnit({ state: states.activeNextTurn }),
    inactive: createTestUnit({ state: states.inactive }),
    frozen: createTestUnit({ state: states.frozen }),
    dead: createTestUnit({ state: states.dead }),
    weakened: createTestUnit({ state: states.weakened })
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
      let actualTargets = skill.getTargets({ all: true }, allUnits);
      // TODO: Should only target active units
      let expectedTargets = targetableStatesAll.map((state) => units[state]);

      expect(actualTargets).to.deep.equal(expectedTargets);
    });

    stateNames.forEach((state) => {
      let targetsState = targetableStatesSingle.indexOf(state) >= 0;
      let should = (targetsState ? 'should' : 'should NOT');

      it(`${should} target ${state} units when targetting single unit`, () => {
        let actualTargets = skill.getTargets({ all: false }, [units[state]]);
        let expectedTargets = (targetsState ? [units[state]] : []);

        expect(actualTargets).to.deep.equal(expectedTargets);
      });
    });
  });
}

export function testStatusApplication(skill, affectedStatus, stacks) {
  describe('basic effects', () => {
    let target;

    beforeEach(() => {
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = skill.affectTarget(null, null, target, 5);

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        skill.affectTarget(null, null, target, 5);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks) {
        it(`should stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          skill.affectTarget(null, null, target, 5);

          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        it(`should NOT stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 3;

          skill.affectTarget(null, null, target, 5);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT stack replace higher values of ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          skill.affectTarget(null, null, target, 3);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });
      }

      it(`should ONLY modify ${affectedStatus}`, () => {
        let expectedStatus = Object.assign({}, target.status, { [affectedStatus]: 5 });

        skill.affectTarget(null, null, target, 5);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    }
  });
}

export function testNegation(skill, negator) {
  describe(`when targetting units that are ${negator}`, () => {
    let target;

    beforeEach(() => {
      target = createTestUnit({ status: { invisible: 5, nullified: 5 } });
    });

    it('should NOT affect them', () => {
      let affected = skill.affectTarget(null, null, target, 5);

      expect(affected).to.be.false;
    });

    it(`should decrement ${negator}`, () => {
      skill.affectTarget(null, null, target, 5);

      expect(target.status[negator], negator).to.equal(4);
    });

    it(`should ONLY modify the ${negator} status`, () => {
      let expectedStatus = Object.assign({}, target.status);
      expectedStatus[negator] = 4;

      skill.affectTarget(null, null, target, 5);

      expect(target.status, "target.status").to.deep.equal(expectedStatus);
    });

    it(`should NOT modify the state`, () => {
      let originalState = target.state;

      skill.affectTarget(null, null, target, 5);

      expect(target.state, "target.state").to.equal(originalState);
    });
  });
}
