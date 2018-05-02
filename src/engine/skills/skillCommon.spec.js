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

const defaultDamageModifiers = {
  armored: false,
  hexed: true,
  warded: true,
  protection: true
};
const damageModifierTypes = {
  armored: {
    effect: -1,
    constant: true
  },
  hexed: {
    effect: 1,
    constant: true
  },
  warded: {
    effect: -1,
    constant: false
  },
  protection: {
    effect: -1,
    constant: false
  }
};
export function testDamage(skill, damageModifierOverrides) {

  describe('basic damage dealing', () => {
    let target;
    let origStatus;
    let affected;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
      origStatus = Object.assign({}, target.status);
      affected = skill.affectTarget(null, null, target, 4);
    });

    it('should affect them', () => {
      expect(affected).to.equal(true);
    });

    it('should remove health equal to its value', () => {
      expect(target.status.healthLeft, "healthLeft").to.equal(1);
    });

    it('should ONLY modify healthLeft', () => {
      let expectedStatus = Object.assign({}, origStatus, { healthLeft: 1 });

      expect(target.status, "target.status").to.deep.equal(expectedStatus);
    });
  });

  describe("modifying target's state", () => {
    let target;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
    });

    it('should NOT mark unit as dead when healthLeft is above 0', () => {
      skill.affectTarget(null, null, target, 4);

      expect(target.state.alive, "isAlive").to.be.true;
    });

    it('should mark unit as dead when healthLeft is exactly 0', () => {
      skill.affectTarget(null, null, target, 5);

      expect(target.state.alive, "isAlive").to.be.false;
    });

    it('should mark unit as dead when healthLeft is less than 0', () => {
      skill.affectTarget(null, null, target, 6);

      expect(target.state.alive, "isAlive").to.be.false;
    });
  });

  describe("interaction with other statuses", () => {
    let damageModifiers = Object.assign(defaultDamageModifiers, damageModifierOverrides);

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 1 } });
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        skill.affectTarget(null, null, target, 2);

        expect(target.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 2 } });
          skill.affectTarget(null, null, target, 1);

          expect(target.status.healthLeft, "healthLeft").to.equal(5);
        });
      });

    Object.entries(damageModifierTypes)
      .forEach(([modifierName, { constant }]) => {
        let should = (constant ? 'should NOT' : 'should');

        it(`${should} reduce ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 2 } });
          let expectedValue = (constant ? 2 : 1);

          skill.affectTarget(null, null, target, 1);

          expect(target.status[modifierName], modifierName).to.equal(expectedValue);
        });

        if (!constant) {
          it(`should never reduce ${modifierName} below 0`, () => {
            let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 1 } });

            skill.affectTarget(null, null, target, 2);

            expect(target.status[modifierName], modifierName).to.equal(0);
          });
        }
      });
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
