import { expect } from 'chai';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';
import { orListFromArray } from './../../../helpers/orListFromArray';

export function whenTriggered(skill) {
  return {
    get shouldAffectTheAttacker() {
      return getCombatSkillHelpers(makeSkillTestState(skill, 'attacker'))
    },
    get shouldAffectTheDefender() {
      return getCombatSkillHelpers(makeSkillTestState(skill, 'defender'))
    },
    shouldNotAffectTheAttacker() {
      return getCombatSkillHelpers(makeSkillTestState(skill, 'attacker')).affectNoOtherStatuses();
    },
    shouldNotAffectTheDefender() {
      return getCombatSkillHelpers(makeSkillTestState(skill, 'defender')).affectNoOtherStatuses();
    }
  }
}

function getCombatSkillHelpers(testState) {
  return {
    applyingTheStatus(status) {
      testState.affectedStatuses.push(status);

      return {
        stackingWithCurrentValue: () => doTestApplyStatus(testState, status,  applicationTypes.stack),
        keepingHighestValue: () => doTestApplyStatus(testState, status, applicationTypes.max),
        replacingCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.replace),
        replacingCurrentValueWith: (value) => doTestApplyStatus(testState, status, value)
      }
    },
    get healingDamage() {
      return dealOrHealDamageHelper(testState, 'heal');
    },
    get dealingDamage() {
      return dealOrHealDamageHelper(testState, 'deal');
    },
    affectNoOtherStatuses() {
      return affectNoOtherStatuses(testState);
    }
  }
}

function dealOrHealDamageHelper(testState, dealOrHeal) {
  testState.affectedStatuses.push('healthLeft');

  return {
    equalToItsValue() {
      testHealingOrDamage(testState.executeSkill, dealOrHeal);
      return getDamageContinuation(testState);
    },
    exactlyXDamage(x) {
      testHealingOrDamage(testState.executeSkill, dealOrHeal, { flatValue: x });
      return getDamageContinuation(testState);
    }
  }
}

function doTestApplyStatus(testState, status, applicationType) {
  shouldApplyStatusTo(testState, status, applicationType);
  return getContinuation(testState);
}

function getDamageContinuation(testState) {
  return {
    get and() {
      return getCombatSkillHelpers(testState);
    },
    modifiedBy(...modifiers) {
      modifiers.forEach((modifier) => testState.affectedStatuses.push(modifier));
      testDamageModifiers(testState, modifiers);
      return getDamageContinuation(testState);
    },
    modifiedByNothing() {
      testDamageModifiers(testState, []);
      return getDamageContinuation(testState);
    }
  };
}

function getContinuation(testState) {
  return {
    get and() {
      return getCombatSkillHelpers(testState);
    }
  };
}

const applicationTypes = {
  stack: 'applicationType.stack',
  max: 'applicationType.max',
  replace: 'applicationType.replace'
};

function shouldApplyStatusTo({executeSkill, target}, affectedStatus, applicationType) {
  describe(`effect on ${target}.status.${affectedStatus}`, () => {
    let targetUnit,
      skillInstance;

    beforeEach(() => {
      targetUnit = createTestUnit();
      skillInstance = { value: 5 };
    });

    switch (applicationType) {
      case applicationTypes.max:
        it(`should replace lower values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT replace higher values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 99;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(99);
        });
        break;
      case applicationTypes.stack:
        it(`should stack with previous ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        [1, 99].forEach(function replaceStatus(flatValue) {
          it(`should always set value of ${affectedStatus} to skill value`, () => {
            let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : skillInstance.value);

            targetUnit.status[affectedStatus] = flatValue;

            executeSkill(skillInstance, targetUnit);

            expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
          });
        });
        break;
    }
  });
}

function affectNoOtherStatuses({executeSkill, affectedStatuses, target}) {
  describe(`No other modifications to ${target}.status`, () => {
    let description = (affectedStatuses.length
      ? `should only modify ${orListFromArray(affectedStatuses)}`
      : 'should NOT modify any statuses')
    it(description, () => {
      let targetUnit = createTestUnit(),
        expectedStatus = Object.assign({}, targetUnit.status);

      executeSkill({ value: 5 }, targetUnit);
      affectedStatuses.forEach((status) => expectedStatus[status] = targetUnit.status[status]);

      expect(targetUnit.status, "target.status").to.deep.equal(expectedStatus);
    });
  });
}

function testDamageModifiers({executeSkill}, damageModifierList) {
  const damageModifierTypes = {
    armored: {
      effect: -1,
      constant: true,
      loc: 'passives'
    },
    hexed: {
      effect: 1,
      constant: true,
      loc: 'status'
    },
    warded: {
      effect: -1,
      constant: false,
      loc: 'status'
    },
    protection: {
      effect: -1,
      constant: false,
      loc: 'status'
    }
  };

  describe("interaction with other statuses", () => {
    let damageModifiers = damageModifierList.reduce((modifiers, modifier) => {
      modifiers[modifier] = true;
      return modifiers;
    },
      {
        armored: false,
        hexed: false,
        warded: false,
        protection: false
      });

    let skillInstance,
      targetUnit;

    beforeEach(() => {
      skillInstance = { value: 5 };
      targetUnit = createTestUnit({ status: { healthLeft: 8 } });
    });

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect, loc }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        Object.assign(targetUnit[loc], { [modifierName]: 1 });
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName, { loc }]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          Object.assign(targetUnit[loc], { [modifierName]: 6 });

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status.healthLeft, "healthLeft").to.equal(8);
        });
      });

    Object.entries(damageModifierTypes)
      .forEach(([modifierName, { constant, loc }]) => {
        let reduced = (damageModifiers[modifierName] ? !constant : false);
        let should = (reduced ? 'should' : 'should NOT');

        it(`${should} reduce ${modifierName}`, () => {
          Object.assign(targetUnit[loc], { [modifierName]: 6 });
          let expectedValue = (reduced ? 1 : 6);

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit[loc][modifierName], modifierName).to.equal(expectedValue);
        });

        if (reduced) {
          it(`should never reduce ${modifierName} below 0`, () => {
            Object.assign(targetUnit[loc], { [modifierName]: 2 });

            executeSkill(skillInstance, targetUnit);

            expect(targetUnit[loc][modifierName], modifierName).to.equal(0);
          });
        }
      });

    if (damageModifiers.warded && damageModifiers.protection) {
      it(`should reduce warded before protection`, () => {
        Object.assign(targetUnit.status, { warded: 4, protection: 4 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.warded, "warded").to.equal(0);
        expect(targetUnit.status.protection, "protection").to.equal(3);
      });

      it(`should have damage reduced by both warded and protection`, () => {
        Object.assign(targetUnit.status, { warded: 1, protection: 1 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }

    if (damageModifiers.armored && damageModifiers.protection) {
      it(`should reduce protection even if it would be blocked by armor`, () => {
        Object.assign(targetUnit.status, { protection: 4 });
        Object.assign(targetUnit.passives, { armored: 4 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.protection, "protection").to.equal(0);
        expect(targetUnit.passives.armored, "armored").to.equal(4);
      });

      it(`should have damage reduced by both armored and protection`, () => {
        Object.assign(targetUnit.status, { protection: 1 });
        Object.assign(targetUnit.passives, { armored: 1 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }
  });
}

function makeSkillTestState(skill, target) {
  function executeSkill(skillInstance, unit) {
    let attacker, defender;
    let dummy = createTestUnit({ status: { healthLeft: 5 } });
    if (target === 'attacker') {
      attacker = unit;
      defender = dummy;
    } else {
      attacker = dummy;
      defender = unit;
    }

    return skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);
  }

  return {
    skill,
    target,
    executeSkill,
    affectedStatuses: []
  }
}
