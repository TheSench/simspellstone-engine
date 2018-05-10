import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from './helpers/testDamageAndHealing.spec';
import { clearStatusesWhenTimer, shouldNeverWearOff, shouldWearOffWhenTimer } from "./helpers/testEffectWearsOff.spec";
import { testNegation } from "./helpers/testNegation.spec";
import { testPotentialTargets } from "./helpers/testPotentialTargets.spec";
import { changeSkillTo } from "./helpers/testSkillChanges.spec";
import { testSkillDoesNothing } from "./helpers/testSkillDoesNothing.spec";
import { shouldChangeStateTo } from "./helpers/testStatusApplication.spec";
import { applicationTypes, shouldAffectNoOtherStatuses, shouldApplyStatusTo } from './helpers/testStatusEffects.spec';
import { testTargetting } from "./helpers/testTargetting.spec";

export function theActivationSkill(skill) {
  var testState = makeActivationSkillTestState(skill);
  return {
    shouldTarget: {
      allOpposingUnits: () => targettingContinuation(testState, testPotentialTargets.allOpposingUnits),
      theDirectlyOpposingUnit: () => targettingContinuation(testState, testPotentialTargets.theDirectlyOpposingUnit),
      theDirectlyOpposingUnitOrCommander: () => targettingContinuation(testState, testPotentialTargets.theDirectlyOpposingUnitOrCommander),
      opposingUnitsInACone: () => targettingContinuation(testState, testPotentialTargets.opposingUnitsInACone),
      allAlliedUnits: () => targettingContinuation(testState, testPotentialTargets.allAlliedUnits),
      adjacentAlliedUnits: () => targettingContinuation(testState, testPotentialTargets.adjacentAlliedUnits),
      itself: () => targettingContinuation(testState, testPotentialTargets.itself)
    },
    shouldChangeStateOfTargetTo: (state) => shouldChangeStateTo(testState, state),
    get whenAffectingTargets() {
      return getSkillHelper(testState);
    }
  };
}

function targettingContinuation(testState, targetFn) {
  targetFn(testState);
  return {
    onlyAffecting: {
      targetsThatAreAlive: () => affectingHelper(testState, ['active', 'activeNextTurn', 'inactive', 'frozen', 'weakened']),
      targetsThatAreActive: () => affectingHelper(testState, ['active', 'weakened']),
      targetsThatWillBeActive: () => affectingHelper(testState, ['active', 'activeNextTurn', 'weakened']),
      targetsThatWillAttack: () => affectingHelper(testState, ['active', 'activeNextTurn'])
    }
  };
}

function affectingHelper(testState, affectedStates) {
  testTargetting(testState, affectedStates);
  return {
    unlessTheyAre: {
      invisible: () => testNegation(testState, 'invisible'),
      nullified: () => testNegation(testState, 'nullified'),
    },
    andNeverBeNegated: () => testNegation(testState, null)
  };
}

function makeActivationSkillTestState(skill) {
  function executeSkill(skillInstance, target) {
    let dummySource = createTestUnit();

    return skill.affectTarget(skillInstance, dummySource, target, skillInstance.value);
  }

  return {
    skill,
    target: 'target',
    executeSkill,
    affectedStatuses: []
  };
}


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
  };
}

export function theTurnSkill(skill) {
  return {
    get shouldAffectTheUnit() {
      return getTurnSkillHelper(skill, 'source');
    },
    shouldDoNothing: () => testSkillDoesNothing(skill),
    shouldChangeItselfTo: (newSkillID) => changeSkillTo(skill, newSkillID)
  };
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
        stackingWithCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.stack),
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
      };
    },
    shouldOnlyAffectTheStatus(status) {
      var continuation = this.shouldAffectTheStatus(status);
      this.shouldAffectNoOtherStatuses(testState);
      return continuation;
    },
    get shouldHealDamage() {
      return dealOrHealDamageHelper(testState, 'heal');
    },
    get shouldDealDamage() {
      return dealOrHealDamageHelper(testState, 'deal');
    },
    shouldNotAffectAnyStatuses() {
      return shouldAffectNoOtherStatuses(testState);
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
  };
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
  };
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
      modifiers.filter(modifier => modifier !== 'armored').forEach((modifier) => testState.affectedStatuses.push(modifier));
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
  };
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
  };
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
  };
}