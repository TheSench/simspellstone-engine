import { expect } from 'chai';
import states from './../unitFactory/unitStates';
import { createTestUnit } from './../unitFactory/unitFactory';

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

export const testPotentialTargets = (function () {
  const field = {
    'player1': {
      commander: 1,
      units: [1.1, 1.2, 1.3, 1.4, 1.5]
    },
    'player2': {
      commander: 2,
      units: [2.1, 2.2, 2.3, 2.4, 2.5]
    }
  }


  function testFinalTargets(skill, allCount, singleCount) {
    it(`should return ${allCount} target(s) when all=true`, () => {
      let filteredTargets = Array(5).fill();

      let actualTargets = skill.getFinalTargets({ all: true }, filteredTargets);

      expect(actualTargets.length, "numTargets").to.equal(allCount);
    });

    it(`should return ${singleCount} target(s) when all=false`, () => {
      let filteredTargets = Array(5).fill();

      let actualTargets = skill.getFinalTargets({ all: false }, filteredTargets);

      expect(actualTargets.length, "numTargets").to.equal(singleCount);
    });
  }

  return {
    allOpposing(skill) {
      describe('potential targets', () => {
        it(`should target opposing units`, () => {
          let source = createTestUnit({ owner: 'player1', opponent: 'player2' });
          let expectedTargets = field.player2.units;

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 1);
      });
    },
    directlyOpposing(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target unit directly across from itself`, () => {
          source.position = 0;
          let expectedTargets = [field.player2.units[0]];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target nothing if there is no opposing unit`, () => {
          source.position = 5;
          let expectedTargets = [];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 1, 1);
      });
    },
    cone(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target unit directly across from itself, and the two units adjacent to it`, () => {
          source.position = 2;
          let expectedTargets = [2.2, 2.3, 2.4];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target nothing if there are no units in range`, () => {
          source.position = 6;
          let expectedTargets = [];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target left two units if it is the first unit in line`, () => {
          source.position = 0;
          let expectedTargets = [2.1, 2.2];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target unit one space to the left, even if no unit is directly across`, () => {
          source.position = 5;
          let expectedTargets = [2.5];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 5);
      });
    },
    allAllied(skill) {
      describe('potential targets', () => {
        it(`should target allied units`, () => {
          let source = createTestUnit({ owner: 'player1', opponent: 'player2' });
          let expectedTargets = field.player1.units;

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 1);
      });
    },
    adjacentAllied(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target units next to itself`, () => {
          source.position = 2;
          let expectedTargets = [1.1, 1.3];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target nothing if there are no  in range`, () => {
          source.position = 4;
          let expectedTargets = [1.4];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target the unit to its right if it is left-most unit`, () => {
          source.position = 0;
          let expectedTargets = [1.2];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 5);
      });
    },
    self(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target itself, regardless of the field`, () => {
          let expectedTargets = [source];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 1, 1);
      });
    }
  }
})();

export function testStatusApplication(skill, affectedStatus, stacks, setsOtherStatuses) {
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

      if (!setsOtherStatuses) {
        it(`should ONLY modify ${affectedStatus}`, () => {
          let expectedStatus = Object.assign({}, target.status, { [affectedStatus]: 5 });

          skill.affectTarget(null, null, target, 5);

          expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
      }
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

export function testHealing(skill) {

  describe('basic healing', () => {
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

    it('should add health equal to its value', () => {
      expect(target.status.healthLeft, "healthLeft").to.equal(9);
    });

    it('should ONLY modify healthLeft', () => {
      let expectedStatus = Object.assign({}, origStatus, { healthLeft: 9 });

      expect(target.status, "target.status").to.deep.equal(expectedStatus);
    });
  });

  describe('boundary cases', () => {
    let target;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
    });

    it('should not heal negative health', () => {
      skill.affectTarget(null, null, target, -6);

      expect(target.status.healthLeft, "healthLeft").to.equal(5);
    });

    it('should not heal above starting health', () => {
      skill.affectTarget(null, null, target, 6);

      expect(target.status.healthLeft, "healthLeft").to.equal(10);
    });
  })
}


export function testNegation(skill, negator) {
  if (negator) {
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

  ['invisible', 'nullified'].filter(status => status !== negator).forEach(status => {

    describe(`when targetting units that are ${status}`, () => {
      it('should affect them', () => {
        let target = createTestUnit({ status: { [status]: 5 } });
        let affected = skill.affectTarget(null, null, target, 5);

        expect(affected).to.be.true;
      });
    });
  });
}
