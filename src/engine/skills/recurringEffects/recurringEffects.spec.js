import { expect } from 'chai';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';
import { applicationTypes, shouldAffectNoOtherStatuses, shouldApplyStatusTo } from '../skillTestsConsolidated/statusEffects.spec';

export const whenTriggered = {
  duringUpkeep: (effect) => whenTriggeredHelper(effect, 'upkeep'),
  atTurnStart: (effect) => whenTriggeredHelper(effect, 'turnStart'),
  atTurnEnd: (effect) => whenTriggeredHelper(effect, 'turnEnd')
}

function whenTriggeredHelper(effect, effectType) {
  var testState = makeSkillTestState(effect, effectType);
  return getRecurringEffectHelpers(testState);
}

function getRecurringEffectHelpers(testState) {

  return {
    shouldModifyTheStatus(status) {
      testState.affectedStatuses.push(status);

      return {
        addingTheEffectValueToTheCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.stack),
        incrementingTheCurrentValueBy: (value) => doTestApplyStatus(testState, status, "+" + value),
        decrementingTheCurrentValueBy: (value) => doTestApplyStatus(testState, status, "-" + value),
        replacingTheCurrentValueIfHigher: () => doTestApplyStatus(testState, status, applicationTypes.max),
        replacingTheCurrentValue: () => doTestApplyStatus(testState, status, applicationTypes.replace),
        replacingTheCurrentValueWith: (value) => doTestApplyStatus(testState, status, value),
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
    affectNoOtherStatuses() {
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

function getDamageContinuation(testState, effectType, affectedStatuses) {
  return {
    get and() {
      return getRecurringEffectHelpers(testState, effectType, affectedStatuses);
    },
    modifiedBy(...modifiers) {
      modifiers.forEach((modifier) => affectedStatuses.push(modifier));
      testDamageModifiers(testState, modifiers);
      return getDamageContinuation(testState, effectType, affectedStatuses);
    },
    modifiedByNothing() {
      testDamageModifiers(testState, []);
      return getDamageContinuation(testState, effectType, affectedStatuses);
    }
  };
}

function getContinuation(testState, affectedStatuses) {
  return {
    get and() {
      return getRecurringEffectHelpers(testState, affectedStatuses);
    }
  };
}

function effectWearsOffHelper(testState, wearOffFn, clearStatusFn) {
  wearOffFn();
  return {
    and: {
      clearTheStatus(status) {
        clearStatusFn([status]);
      },
      clearTheStatuses(statuses) {
        clearStatusFn(statuses);
      }
    }
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
  }
}

function doTestApplyStatus(testState, status, applicationType, applicationValueSource) {
  shouldApplyStatusTo(testState, status, applicationType, applicationValueSource);
  return getContinuation(testState);
}

function shouldWearOffWhenTimer({ executeSkill, effectType }, timer) {
  describe('effect wears off', () => {
    let unit,
      effectInstance;

    beforeEach(() => {
      unit = createTestUnit({ status: { corroded: 5 } });
      effectInstance = { id: 'effectInTest', value: 5 };
      unit.skills[effectType].push(effectInstance);
    });

    it(`should NOT wear off when ${timer} is greater than zero`, () => {
      unit.status[timer] = 2;

      executeSkill(effectInstance, unit);

      expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(1);
    });

    it(`should wear off when ${timer} is reduced to zero`, () => {
      unit.status[timer] = 1;

      executeSkill(effectInstance, unit);

      expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(0);
    });
  });
}

function clearStatusesWhenTimer({ executeSkill }, timer, statuses) {
  describe('effect clears status when worn off', () => {
    let unit,
      effectInstance;

    beforeEach(() => {
      unit = createTestUnit();
      effectInstance = { id: 'effectInTest', value: 5 };
    });

    statuses.forEach((status) => {
      it(`should NOT clear ${status} status when ${timer} is greater than zero`, () => {
        unit.status[timer] = 2;
        unit.status[status] = 5;

        executeSkill(effectInstance, unit);

        expect(unit.status[status]).to.be.greaterThan(0);
      });

      it(`should clear ${status} status when ${timer} is reduced to zero`, () => {
        unit.status[timer] = 1;
        unit.status[status] = 5;

        executeSkill(effectInstance, unit);

        expect(unit.status[status]).to.equal(0);
      });
    });
  });
}

function shouldNeverWearOff({ executeSkill, effectType }) {
  describe('effect NEVER wears off', () => {
    let unit,
      effectInstance;

    beforeEach(() => {
      unit = createTestUnit({ status: { corroded: 5 } });
      effectInstance = { id: 'effectInTest', value: 5 };
      unit.skills[effectType].push(effectInstance);
    });

    [0, 1, 2].forEach((value) => {
      it(`should NOT wear off`, () => {
        Object.keys(unit.status).forEach((key) => unit.status[key] = value);

        executeSkill(effectInstance, unit);

        expect(unit.skills[effectType].length, `NOT removed from ${effectType} skills`).to.equal(1);
      });
    });
  });
}

function makeSkillTestState(effect, effectType) {
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
