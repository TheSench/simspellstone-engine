import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { orListFromArray } from './../../../helpers/orListFromArray';

export function whenTriggered(skill) {
  return {
    get shouldAffectItself() {
      return getCombatSkillHelpers(skill, 'source')
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
      return getContinuation(skill, target, affectedStatuses);
    },
    exactlyXDamage(x) {
      shouldDealOrHealExactlyXDamage(skill, target, dealOrHeal, x);
      return getContinuation(skill, target, affectedStatuses);
    }
  }
}

function doTestApplyStatus(affectedStatuses, skill, status, target, applicationType) {
  shouldApplyStatusTo(skill, status, target, applicationType);
  return getContinuation(skill, target, affectedStatuses);
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
    let source = null,
      field = null,
      targetUnit,
      skillInstance;

    beforeEach(() => {
      source = createTestUnit();
      field = null; // TODO: Set up field
      targetUnit = (target === 'source' ? source : null);
      skillInstance = { value: 5 };
    });

    switch (applicationType) {
      case applicationTypes.max:
        it(`should replace lower values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          skill.doPerformSkill(skillInstance, source, field, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT replace higher values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 99;

          skill.doPerformSkill(skillInstance, source, field, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(99);
        });
        break;
      case applicationTypes.stack:
        it(`should stack with previous ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          skill.doPerformSkill(skillInstance, source, field, skillInstance.value);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        [1, 99].forEach(function replaceStatus(flatValue) {
          let expectedDescription = (applicationType !== applicationTypes.replace ? applicationType : 'skill value');
          it(`should always set value of ${affectedStatus} to ${expectedDescription}`, () => {
            let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : skillInstance.value);

            targetUnit.status[affectedStatus] = flatValue;

            skill.doPerformSkill(skillInstance, source, field, skillInstance.value);

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
        source = createTestUnit(),
        field = null, // TODO: Set yp field
        targetUnit = (target === 'source' ? source : null),
        expectedStatus = Object.assign({}, targetUnit.status),
        skillInstance = { value: 5 };

      skill.doPerformSkill(skillInstance, source, field, skillInstance.value);
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
    let damageFnName = `${dealOrHeal}Damage`;

    describe(description, () => {
      let targetUnit,
        source,
        field,
        skillInstance;

      beforeEach(() => {
        skillInstance = { value };
        source = createTestUnit({ status: { healthLeft: 5 } });
        field = null; // TODO: Set up field
        targetUnit = (target === 'source' ? source : null),
        sinon.spy(source, damageFnName);

        skill.doPerformSkill(skillInstance, source, field, skillInstance.value);
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
