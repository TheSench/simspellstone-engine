import { testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';
import { shouldAffectNoOtherStatuses, shouldApplyStatusTo } from '../skillTestsConsolidated/statusEffects.spec';
import { changeSkillTo } from './testSkillChanges.spec';
import { testSkillDoesNothing } from './testSkillDoesNothing.spec';

export function whenTriggered(skill) {
  return {
    get shouldAffectItself() {
      return getCombatSkillHelpers(makeSkillTestState(skill, 'source'));
    },
    shouldDoNothing: () => testSkillDoesNothing(skill),
    shouldChangeItselfTo: (newSkillID) => changeSkillTo(skill, newSkillID)
  }
}

function getCombatSkillHelpers(testState) {
  return {
    applyingTheStatus(status) {
      testState.affectedStatuses.push(status);

      return {
        stackingWithCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.stack),
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
      testHealingOrDamage(testState.executeSkill, dealOrHeal);
      return getContinuation(testState);
    },
    exactlyXDamage(x) {
      testHealingOrDamage(testState.executeSkill, dealOrHeal, x);
      return getContinuation(testState);
    }
  }
}

function doTestApplyStatus(testState, status, applicationType) {
  shouldApplyStatusTo(testState, status, applicationType);
  return getContinuation(testState);
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

function makeSkillTestState(skill, target) {
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
