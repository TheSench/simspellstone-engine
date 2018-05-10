import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';
import { applicationTypes, shouldAffectNoOtherStatuses, shouldApplyStatusTo } from '../skillTestsConsolidated/statusEffects.spec';

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
