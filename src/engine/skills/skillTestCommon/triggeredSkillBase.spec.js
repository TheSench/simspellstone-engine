import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from './damageTests.spec';
import { applicationTypes, shouldAffectNoOtherStatuses, shouldApplyStatusTo } from './statusEffects.spec';
import { changeSkillTo } from "./testSkillChanges.spec";
import { testSkillDoesNothing } from "./testSkillDoesNothing.spec";

export function theCombatSkill(skill) {
  return {
    get shouldAffectTheAttacker() {
      return getTriggeredSkillHelpers(makeCombatSkillTestState(skill, 'attacker'))
    },
    get shouldAffectTheDefender() {
      return getTriggeredSkillHelpers(makeCombatSkillTestState(skill, 'defender'))
    },
    shouldNotAffectTheAttacker() {
      return getTriggeredSkillHelpers(makeCombatSkillTestState(skill, 'attacker')).affectNoOtherStatuses();
    },
    shouldNotAffectTheDefender() {
      return getTriggeredSkillHelpers(makeCombatSkillTestState(skill, 'defender')).affectNoOtherStatuses();
    }
  }
}

export function theTurnSkill(skill) {
  return {
    get shouldAffectTheUnit() {
      return getTriggeredSkillHelpers(makeTurnSkillTestState(skill, 'source'));
    },
    shouldDoNothing: () => testSkillDoesNothing(skill),
    shouldChangeItselfTo: (newSkillID) => changeSkillTo(skill, newSkillID)
  }
}

function getTriggeredSkillHelpers(testState) {
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
      return shouldAffectNoOtherStatuses(testState);
    }
  }
}

function dealOrHealDamageHelper(testState, dealOrHeal) {
  testState.affectedStatuses.push('healthLeft');

  return {
    equalToItsValue() {
      testHealingOrDamage(testState, dealOrHeal);
      return getDamageContinuation(testState);
    },
    exactlyXDamage(x) {
      testHealingOrDamage(testState, dealOrHeal, { flatValue: x });
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
      return getTriggeredSkillHelpers(testState);
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
      return getTriggeredSkillHelpers(testState);
    }
  };
}

function makeCombatSkillTestState(skill, target) {
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

function makeTurnSkillTestState(skill, target) {
  function executeSkill(skillInstance, source) {
    let field = null; // TODO: Set up field

    skill.doPerformSkill(skillInstance, source, field, skillInstance.value);
  }

  return {
    skill,
    target,
    executeSkill,
    affectedStatuses: []
  }
}
