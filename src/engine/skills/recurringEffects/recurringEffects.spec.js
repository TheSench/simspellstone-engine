import { expect } from 'chai';
import { orListFromArray } from '../../../helpers/orListFromArray';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { testDamageModifiers, testHealingOrDamage } from '../skillTestsConsolidated/damageTests.spec';

export const whenTriggered = {
  duringUpkeep: (effect) => whenTriggeredHelper(effect, 'upkeep'),
  atTurnStart: (effect) => whenTriggeredHelper(effect, 'turnStart'),
  atTurnEnd: (effect) => whenTriggeredHelper(effect, 'turnEnd')
}

function whenTriggeredHelper(effect, effectType) {
  return getRecurringEffectHelpers(effect, effectType, []);
}

function getRecurringEffectHelpers(effect, effectType, affectedStatuses) {
  var testState = makeSkillTestState(effect);

  return {
    shouldModifyTheStatus(status) {
      affectedStatuses.push(status);

      return {
        addingTheEffectValueToTheCurrentValue: () => doTestApplyStatus(affectedStatuses, effect, effectType, status, applicationTypes.stack),
        incrementingTheCurrentValueBy: (value) => doTestApplyStatus(affectedStatuses, effect, effectType, status, "+" + value),
        decrementingTheCurrentValueBy: (value) => doTestApplyStatus(affectedStatuses, effect, effectType, status, "-" + value),
        replacingTheCurrentValueIfHigher: () => doTestApplyStatus(affectedStatuses, effect, effectType, status, applicationTypes.max),
        replacingTheCurrentValue: () => doTestApplyStatus(affectedStatuses, effect, effectType, status, applicationTypes.replace),
        replacingTheCurrentValueWith: (value) => doTestApplyStatus(affectedStatuses, effect, effectType, status, value),
        addingTheValueOf: (valueStatus) => {
          return {
            toTheCurrentValue() {
              return doTestApplyStatus(affectedStatuses, effect, effectType, status, applicationTypes.stack, valueStatus);
            }
          };
        }
      }
    },
    get shouldHealDamage() {
      return dealOrHealDamageHelper(testState, effectType, affectedStatuses, 'heal');
    },
    get shouldDealDamage() {
      return dealOrHealDamageHelper(testState, effectType, affectedStatuses, 'deal');
    },
    affectNoOtherStatuses() {
      return affectNoOtherStatuses(effect, affectedStatuses);
    },
    shouldWearOff: {
      whenTimer(timerStatus) {
        return {
          becomesZero() {
            return effectWearsOffHelper(effect, effectType,
              () => shouldWearOffWhenTimer(effect, effectType, timerStatus),
              (clearedStatuses) => clearStatusesWhenTimer(effect, timerStatus, clearedStatuses));
          }
        };
      }
    },
    shouldNeverWearOff: () => shouldNeverWearOff(effect, effectType)
  }
}

function getDamageContinuation(testState, effectType, affectedStatuses) {
  return {
    get and() {
      return getRecurringEffectHelpers(testState.skill, effectType, affectedStatuses);
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

function getContinuation(effect, effectType, affectedStatuses) {
  return {
    get and() {
      return getRecurringEffectHelpers(effect, effectType, affectedStatuses);
    }
  };
}

function effectWearsOffHelper(effect, effectType, wearOffFn, clearStatusFn) {
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

function dealOrHealDamageHelper(testState, effectType, affectedStatuses, dealOrHeal) {
  testState.affectedStatuses.push('healthLeft');

  return {
    equalToItsValue() {
      testHealingOrDamage(testState, dealOrHeal);
      return getDamageContinuation(testState, effectType, affectedStatuses);
    },
    exactlyXDamage(x) {
      testHealingOrDamage(testState, dealOrHeal, { flatValue: x });
      return getDamageContinuation(testState, effectType, affectedStatuses);
    },
    equalToTheValueOf(sourceStatus) {
      testHealingOrDamage(testState, dealOrHeal, { sourceStatus: sourceStatus });
      return getDamageContinuation(testState, effectType, affectedStatuses);
    }
  }
}

function doTestApplyStatus(affectedStatuses, effect, effectType, status, applicationType, applicationValueSource) {
  shouldApplyStatus(effect, status, applicationType, applicationValueSource);
  return getContinuation(effect, effectType, affectedStatuses);
}

const applicationTypes = {
  stack: 'applicationType.stack',
  max: 'applicationType.max',
  replace: 'applicationType.replace'
};
function shouldApplyStatus(effect, affectedStatus, applicationType, applicationValueSource) {
  describe(`effect on unit.status.${affectedStatus}`, () => {
    let unit = null,
      effectInstance;

    beforeEach(() => {
      unit = createTestUnit();
      if (applicationValueSource) {
        unit.status[applicationValueSource] = 5;
      }
      effectInstance = { value: (applicationValueSource ? -1 : 5) };
    });

    switch (applicationType) {
      case applicationTypes.max:
        basicStatusApplication(effect, affectedStatus, { sourceStatus: applicationValueSource });

        it(`should replace lower values of ${affectedStatus}`, () => {
          unit.status[affectedStatus] = 3;

          effect.apply(effectInstance, unit);

          expect(unit.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT replace higher values of ${affectedStatus}`, () => {
          unit.status[affectedStatus] = 99;

          effect.apply(effectInstance, unit);

          expect(unit.status[affectedStatus], affectedStatus).to.equal(99);
        });
        break;
      case applicationTypes.stack:
        basicStatusApplication(effect, affectedStatus, { sourceStatus: applicationValueSource });

        it(`should stack with the current value of ${affectedStatus}`, () => {
          unit.status[affectedStatus] = 3;

          effect.apply(effectInstance, unit);

          expect(unit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        if (/[+-]\d+/.test(applicationType)) {
          let value = parseInt(applicationType);
          let change = (value > 0 ? 'increment' : 'decrement');
          it(`should ${change} the current value of ${affectedStatus} by ${value}`, () => {
            let startingValue = 1 + Math.abs(value);
            let expectedValue = startingValue + value;
            unit.status[affectedStatus] = startingValue;

            effect.apply(effectInstance, unit);

            expect(unit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
          });
        } else {
          [1, 99].forEach(function replaceStatus(flatValue) {
            let valueSource = (applicationValueSource ? `${applicationValueSource} status` : 'effect')
            it(`should always set value of ${affectedStatus} to ${valueSource} value`, () => {
              let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : effectInstance.value);

              unit.status[affectedStatus] = flatValue;

              effect.apply(effectInstance, unit);

              expect(unit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
            });
          });
        }
        break;
    }
  });
}

function basicStatusApplication(effect, affectedStatus, { sourceStatus, flatValue } = {}) {
  [1, 2, 99].forEach((testValue) => {
    let expectedValue = (sourceStatus !== undefined
      ? sourceStatus
      : flatValue !== undefined
        ? flatValue
        : testValue);

    it(`given a value of ${testValue}, it should apply a status of ${affectedStatus} equal to ${expectedValue}`, () => {
      let unit = createTestUnit();
      if (sourceStatus) {
        unit.status[sourceStatus] = 5;
        expectedValue = 5;
      }

      let effectInstance = { id: 'effectInTest', value: testValue };

      effect.apply(effectInstance, unit);

      expect(unit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
    });
  });

  if (sourceStatus) {
    [1, 2, 99].forEach((testValue) => {
      it(`given a ${sourceStatus} status of ${testValue}, it should apply a status of ${affectedStatus} equal to ${testValue}`, () => {
        let unit = createTestUnit({ status: { [sourceStatus]: testValue } });
        let effectInstance = { id: 'effectInTest', value: 5 };

        effect.apply(effectInstance, unit);

        expect(unit.status[affectedStatus], affectedStatus).to.equal(testValue);
      });
    });
  }
}

function affectNoOtherStatuses(effect, affectedStatuses) {
  describe(`No other modifications to unit.status`, () => {
    let description = (affectedStatuses.length
      ? `should only modify ${orListFromArray(affectedStatuses)}`
      : 'should NOT modify any statuses');

    it(description, () => {
      let unit = createTestUnit(),
        expectedStatus = Object.assign({}, unit.status);

      effect.apply({ value: 5 }, unit);
      affectedStatuses.forEach((status) => expectedStatus[status] = unit.status[status]);

      expect(unit.status, "target.status").to.deep.equal(expectedStatus);
    });
  });
}

function shouldWearOffWhenTimer(effect, effectType, timer) {
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

      effect.apply(effectInstance, unit);

      expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(1);
    });

    it(`should wear off when ${timer} is reduced to zero`, () => {
      unit.status[timer] = 1;

      effect.apply(effectInstance, unit);

      expect(unit.skills.turnEnd.length, `removed from ${effectType} skills`).to.equal(0);
    });
  });
}

function clearStatusesWhenTimer(effect, timer, statuses) {
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

        effect.apply(effectInstance, unit);

        expect(unit.status[status]).to.be.greaterThan(0);
      });

      it(`should clear ${status} status when ${timer} is reduced to zero`, () => {
        unit.status[timer] = 1;
        unit.status[status] = 5;

        effect.apply(effectInstance, unit);

        expect(unit.status[status]).to.equal(0);
      });
    });
  });
}

function shouldNeverWearOff(effect, effectType) {
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

        effect.apply(effectInstance, unit);

        expect(unit.skills[effectType].length, `NOT removed from ${effectType} skills`).to.equal(1);
      });
    });
  });
}

function makeSkillTestState(effect) {
  function executeSkill(effectInstance, unit) {
    effect.apply(effectInstance, unit);
  }

  return {
    skill: effect,
    executeSkill,
    affectedStatuses: []
  }
}
