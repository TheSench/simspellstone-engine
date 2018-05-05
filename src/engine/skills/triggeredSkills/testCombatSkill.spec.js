import { expect } from 'chai';
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
    affectNoOtherStatuses() {
      return affectNoOtherStatuses(skill, affectedStatuses, target);
    }
  }
}

function doTestApplyStatus(affectedStatuses, skill, status, target, applicationType) {
  shouldApplyStatusTo(skill, status, target, applicationType);
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
