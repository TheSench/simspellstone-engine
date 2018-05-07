import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { orListFromArray } from './../../../helpers/orListFromArray';

export function whenTriggered(skill) {
  return {
    get shouldAffectTheAttacker() {
      return getCombatSkillHelpers(skill, 'attacker')
    },
    get shouldAffectTheDefender() {
      return getCombatSkillHelpers(skill, 'defender')
    },
    shouldNotAffectTheAttacker() {
      return getCombatSkillHelpers(skill, 'attacker').affectNoOtherStatuses();
    },
    shouldNotAffectTheDefender() {
      return getCombatSkillHelpers(skill, 'defender').affectNoOtherStatuses();
    }
  }
}

function getCombatSkillHelpers(skill, target, affectedStatuses) {
  affectedStatuses = (affectedStatuses || []);

  return {
    applyingTheStatus(status) {
      affectedStatuses.push(status);

      return {
        stackingWithCurrentValue: () => doTestApplyStatus(affectedStatuses, skill, status, target, applicationTypes.stack),
        keepingHighestValue: () => doTestApplyStatus(affectedStatuses, skill, status, target, applicationTypes.max),
        replacingCurrentValue: () => doTestApplyStatus(affectedStatuses, skill, status, target, applicationTypes.replace),
        replacingCurrentValueWith: (value) => doTestApplyStatus(affectedStatuses, skill, status, target, value)
      }
    },
    get healingDamage() {
      return dealOrHealDamageHelper(skill, target, affectedStatuses, 'heal');
    },
    get dealingDamage() {
      return dealOrHealDamageHelper(skill, target, affectedStatuses, 'deal');
    },
    affectNoOtherStatuses() {
      return affectNoOtherStatuses(skill, affectedStatuses, target);
    }
  }
}

function dealOrHealDamageHelper(skill, target, affectedStatuses, dealOrHeal) {
  affectedStatuses.push('healthLeft');

  return {
    equalToItsValue() {
      shouldDealOrHealDamageEqualToValue(skill, target, dealOrHeal);
      return getDamageContinuation(skill, target, affectedStatuses);
    },
    exactlyXDamage(x) {
      shouldDealOrHealExactlyXDamage(skill, target, dealOrHeal, x);
      return getDamageContinuation(skill, target, affectedStatuses);
    }
  }
}

function doTestApplyStatus(affectedStatuses, skill, status, target, applicationType) {
  shouldApplyStatusTo(skill, status, target, applicationType);
  return getContinuation(skill, target, affectedStatuses);
}

function getDamageContinuation(skill, target, affectedStatuses) {
  return {
    get and() {
      return getCombatSkillHelpers(skill, target, affectedStatuses);
    },
    modifiedBy(...modifiers) {
      modifiers.forEach((modifier) => affectedStatuses.push(modifier));
      testDamageModifiers(skill, target, modifiers);
      return getDamageContinuation(skill, target, affectedStatuses);
    },
    modifiedByNothing() {
      testDamageModifiers(skill, target, []);
      return getDamageContinuation(skill, target, affectedStatuses);
    }
  };
}

function getContinuation(skill, target, affectedStatuses) {
  return {
    get and() {
      return getCombatSkillHelpers(skill, target, affectedStatuses);
    }
  };
}

const applicationTypes = {
  stack: 'applicationType.stack',
  max: 'applicationType.max',
  replace: 'applicationType.replace'
};

function shouldApplyStatusTo(skill, affectedStatus, target, applicationType) {
  describe(`effect on ${target}.status.${affectedStatus}`, () => {
    let attacker = null,
      defender = null,
      targetUnit,
      skillInstance;

    beforeEach(() => {
      attacker = createTestUnit();
      defender = createTestUnit();
      targetUnit = (target === 'attacker' ? attacker : defender);
      skillInstance = { value: 5 };
    });

    switch (applicationType) {
      case applicationTypes.max:
        it(`should replace lower values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT replace higher values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 99;

          skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(99);
        });
        break;
      case applicationTypes.stack:
        it(`should stack with previous ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        [1, 99].forEach(function replaceStatus(flatValue) {
          it(`should always set value of ${affectedStatus} to skill value`, () => {
            let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : skillInstance.value);

            targetUnit.status[affectedStatus] = flatValue;

            skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

            expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
          });
        });
        break;
    }
  });
}

function affectNoOtherStatuses(skill, affectedStatuses, target) {
  describe(`No other modifications to ${target}.status`, () => {
    let description = (affectedStatuses.length
      ? `should only modify ${orListFromArray(affectedStatuses)}`
      : 'should NOT modify any statuses')
    it(description, () => {
      let
        attacker = createTestUnit(),
        defender = createTestUnit(),
        targetUnit = (target === 'attacker' ? attacker : defender),
        expectedStatus = Object.assign({}, targetUnit.status);

      skill.doPerformSkill({ value: 5 }, attacker, defender, 5);
      affectedStatuses.forEach((status) => expectedStatus[status] = targetUnit.status[status]);

      expect(targetUnit.status, "target.status").to.deep.equal(expectedStatus);
    });
  });
}

export function shouldDealOrHealDamageEqualToValue(skill, target, dealOrHeal) {
  testDamage(skill, target, dealOrHeal);
}

export function shouldDealOrHealExactlyXDamage(skill, target, dealOrHeal, x) {
  testDamage(skill, target, dealOrHeal, x);
}

function testDamage(skill, target, dealOrHeal, flatValue) {

  [1, 99].forEach((value) => {
    let description = (flatValue ? 'given any value' : `given a value of ${value}`);
    let expectedValue = (flatValue || value);
    let dealtOrHealed = (dealOrHeal === 'deal' ? 'dealt' : 'healed');
    let damageFnName = `${dealOrHeal === 'deal' ? 'take' : 'heal'}Damage`;

    describe(description, () => {
      let targetUnit,
        attacker,
        defender,
        skillInstance;

      beforeEach(() => {
        skillInstance = { value };
        attacker = createTestUnit({ status: { healthLeft: 5 } });
        defender = createTestUnit({ status: { healthLeft: 5 } });
        targetUnit = (target === 'attacker' ? attacker : defender);
        sinon.spy(targetUnit, damageFnName)

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);
      });

      afterEach(() => {
        targetUnit[damageFnName].restore();
      });

      it(`should ${dealOrHeal} ${expectedValue} damage`, () => {
        expect(targetUnit[damageFnName].calledWithExactly(expectedValue), `${dealtOrHealed} ${expectedValue} damage`).to.be.true;
      });

      it(`should only ${dealOrHeal} damage once`, () => {
        expect(targetUnit[damageFnName].callCount, `only ${dealtOrHealed} damage once`).to.equal(1);
      });
    });
  });
}

export function testDamageModifiers(skill, target, damageModifierList) {
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
      attacker,
      defender,
      targetUnit;

    beforeEach(() => {
      skillInstance = { value: 5 };
      attacker = createTestUnit({ status: { healthLeft: 8 } });
      defender = createTestUnit({ status: { healthLeft: 8 } });
      targetUnit = (target === 'attacker' ? attacker : defender);
    });

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect, loc }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        Object.assign(targetUnit[loc], { [modifierName]: 1 });
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName, { loc }]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          Object.assign(targetUnit[loc], { [modifierName]: 6 });

          skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

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

          skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

          expect(targetUnit[loc][modifierName], modifierName).to.equal(expectedValue);
        });

        if (reduced) {
          it(`should never reduce ${modifierName} below 0`, () => {
            Object.assign(targetUnit[loc], { [modifierName]: 2 });

            skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

            expect(targetUnit[loc][modifierName], modifierName).to.equal(0);
          });
        }
      });

    if (damageModifiers.warded && damageModifiers.protection) {
      it(`should reduce warded before protection`, () => {
        Object.assign(targetUnit.status, { warded: 4, protection: 4 });

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

        expect(targetUnit.status.warded, "warded").to.equal(0);
        expect(targetUnit.status.protection, "protection").to.equal(3);
      });

      it(`should have damage reduced by both warded and protection`, () => {
        Object.assign(targetUnit.status, { warded: 1, protection: 1 });

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }

    if (damageModifiers.armored && damageModifiers.protection) {
      it(`should reduce protection even if it would be blocked by armor`, () => {
        Object.assign(targetUnit.status, { protection: 4 });
        Object.assign(targetUnit.passives, { armored: 4 });

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

        expect(targetUnit.status.protection, "protection").to.equal(0);
        expect(targetUnit.passives.armored, "armored").to.equal(4);
      });

      it(`should have damage reduced by both armored and protection`, () => {
        Object.assign(targetUnit.status, { protection: 1 });
        Object.assign(targetUnit.passives, { armored: 1 });

        skill.doPerformSkill(skillInstance, attacker, defender, skillInstance.value);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }
  });
}