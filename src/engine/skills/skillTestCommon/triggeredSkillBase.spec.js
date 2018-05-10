import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from './helpers/testDamageAndHealing.spec';
import { clearStatusesWhenTimer, shouldNeverWearOff, shouldWearOffWhenTimer } from "./helpers/testEffectWearsOff.spec";
import { changeSkillTo } from "./helpers/testSkillChanges.spec";
import { testSkillDoesNothing } from "./helpers/testSkillDoesNothing.spec";
import { applicationTypes, shouldAffectNoOtherStatuses, shouldApplyStatusTo } from './helpers/testStatusEffects.spec';

export function theCombatSkill(skill) {
  return {
    get givenTheAttacker() {
      return combatSkillHelper(skill, 'attacker');
    },
    get givenTheDefender() {
      return combatSkillHelper(skill, 'defender');
    },
    shouldNotAffectTheAttacker() {
      return combatSkillHelper(skill, 'attacker').shouldAffectNoOtherStatuses();
    },
    shouldNotAffectTheDefender() {
      return combatSkillHelper(skill, 'defender').shouldAffectNoOtherStatuses();
    }
  }
}

export function theTurnSkill(skill) {
  return {
    get shouldAffectTheUnit() {
      return getTurnSkillHelper(skill, 'source');
    },
    shouldDoNothing: () => testSkillDoesNothing(skill),
    shouldChangeItselfTo: (newSkillID) => changeSkillTo(skill, newSkillID)
  }
}

export function theRecurringEffect(effect) {
  return {
      triggeredDuringUpkeep: () => getRecurringEffectSkillHelper(effect, 'upkeep'),
      triggeredAtTurnStart: () => getRecurringEffectSkillHelper(effect, 'turnStart'),
      triggeredAtTurnEnd: () => getRecurringEffectSkillHelper(effect, 'turnEnd')
  };
}

function combatSkillHelper(skill, target) {
  let testState = makeCombatSkillTestState(skill, target);
  return getSkillHelper(testState);
}

function getTurnSkillHelper(skill, target) {
  let testState = makeTurnSkillTestState(skill, target);
  return getSkillHelper(testState);
}

function getRecurringEffectSkillHelper(effect, effectType) {
  let testState = makeRecurringEffectTestState(effect, effectType);
  return getSkillHelper(testState);
}

function getSkillHelper(testState) {
  return {
    shouldAffectTheStatus(status) {
      testState.affectedStatuses.push(status);

      return {
        incrementingTheCurrentValueBy: (value) => doTestApplyStatus(testState, status, "+" + value),
        decrementingTheCurrentValueBy: (value) => doTestApplyStatus(testState, status, "-" + value),
        stackingWithCurrentValue: () => doTestApplyStatus(testState, status,  applicationTypes.stack),
        replacingTheCurrentValueIfHigher: () => doTestApplyStatus(testState, status, applicationTypes.max),
        replacingCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.replace),
        replacingCurrentValueWith: (value) => doTestApplyStatus(testState, status, value),
        addingTheValueOf: (valueStatus) => {
          return {
            toTheCurrentValue() {
              return doTestApplyStatus(testState, status, applicationTypes.stack, valueStatus);
            }
          };
        }
      }
    },
    get shouldHealDamage() {
      return dealOrHealDamageHelper(testState, 'heal');
    },
    get shouldDealDamage() {
      return dealOrHealDamageHelper(testState, 'deal');
    },
    shouldAffectNoOtherStatuses() {
      return shouldAffectNoOtherStatuses(testState);
    },
    shouldWearOff: {
      whenTimer(timerStatus) {
        return {
          becomesZero() {
            return effectWearsOffHelper(testState,
              () => shouldWearOffWhenTimer(testState, timerStatus),
              (clearedStatuses) => clearStatusesWhenTimer(testState, timerStatus, clearedStatuses));
          }
        };
      }
    },
    shouldNeverWearOff: () => shouldNeverWearOff(testState)
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
    },
    equalToTheValueOf(sourceStatus) {
      testHealingOrDamage(testState, dealOrHeal, { sourceStatus: sourceStatus });
      return getDamageContinuation(testState);
    }
  }
}

function doTestApplyStatus(testState, status, applicationType, valueStatus) {
  shouldApplyStatusTo(testState, status, applicationType, valueStatus);
  return getContinuation(testState);
}

function getDamageContinuation(testState) {
  return {
    get and() {
      return getSkillHelper(testState);
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
      return getSkillHelper(testState);
    }
  };
}

function effectWearsOffHelper(testState, wearOffFn, clearStatusFn) {
  wearOffFn();
  return {
    and: {
      shouldClearTheStatus(status) {
        clearStatusFn([status]);
      },
      clearTheStatuses(statuses) {
        clearStatusFn(statuses);
      }
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



function makeRecurringEffectTestState(effect, effectType) {
  function executeSkill(effectInstance, unit) {
    effect.apply(effectInstance, unit);
  }

  return {
    skill: effect,
    target: 'unit',
    effectType,
    executeSkill,
    affectedStatuses: []
  }
}