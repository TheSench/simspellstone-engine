import { expect } from 'chai';
import { orListFromArray } from '../../../../helpers/orListFromArray';
import { createTestUnit } from "../../../unitFactory/unitFactory";

export const applicationTypes = {
  stack: 'applicationType.stack',
  max: 'applicationType.max',
  replace: 'applicationType.replace'
};

export function shouldApplyStatusTo({executeSkill, target}, affectedStatus, applicationType, applicationValueSource) {
  describe(`effect on ${target}.status.${affectedStatus}`, () => {
    let targetUnit = null,
      skillInstance;

    beforeEach(() => {
      targetUnit = createTestUnit();
      if (applicationValueSource) {
        targetUnit.status[applicationValueSource] = 5;
      }
      skillInstance = { value: (applicationValueSource ? -1 : 5) };
    });

    switch (applicationType) {
      case applicationTypes.max:
        basicStatusApplication(executeSkill, affectedStatus, { sourceStatus: applicationValueSource });

        it(`should replace lower values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT replace higher values of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 99;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(99);
        });
        break;
      case applicationTypes.stack:
        basicStatusApplication(executeSkill, affectedStatus, { sourceStatus: applicationValueSource });

        it(`should stack with the current value of ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        if (/[+-]\d+/.test(applicationType)) {
          let value = parseInt(applicationType);
          let change = (value > 0 ? 'increment' : 'decrement');
          it(`should ${change} the current value of ${affectedStatus} by ${value}`, () => {
            let startingValue = 1 + Math.abs(value);
            let expectedValue = startingValue + value;
            targetUnit.status[affectedStatus] = startingValue;

            executeSkill(skillInstance, targetUnit);

            expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
          });
        } else {
          [1, 99].forEach(function replaceStatus(flatValue) {
            let valueSource = (applicationValueSource ? `${applicationValueSource} status` : 'effect');
            it(`should always set value of ${affectedStatus} to ${valueSource} value`, () => {
              let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : skillInstance.value);

              targetUnit.status[affectedStatus] = flatValue;

              executeSkill(skillInstance, targetUnit);

              expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
            });
          });
        }
        break;
    }
  });
}

function basicStatusApplication(executeSkill, affectedStatus, { sourceStatus, flatValue } = {}) {
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

      executeSkill(effectInstance, unit);

      expect(unit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
    });
  });

  if (sourceStatus) {
    [1, 2, 99].forEach((testValue) => {
      it(`given a ${sourceStatus} status of ${testValue}, it should apply a status of ${affectedStatus} equal to ${testValue}`, () => {
        let unit = createTestUnit({ status: { [sourceStatus]: testValue } });
        let effectInstance = { id: 'effectInTest', value: 5 };

        executeSkill(effectInstance, unit);

        expect(unit.status[affectedStatus], affectedStatus).to.equal(testValue);
      });
    });
  }
}

export function shouldAffectNoOtherStatuses({executeSkill, affectedStatuses, target}) {
  describe(`No other modifications to ${target}.status`, () => {
    let description = (affectedStatuses.length
      ? `should only modify ${orListFromArray(affectedStatuses)}`
      : 'should NOT modify any statuses');
    it(description, () => {
      let targetUnit = createTestUnit(),
        expectedStatus = Object.assign({}, targetUnit.status);

      executeSkill({ value: 5 }, targetUnit);
      affectedStatuses.forEach((status) => expectedStatus[status] = targetUnit.status[status]);

      expect(targetUnit.status, "target.status").to.deep.equal(expectedStatus);
    });
  });
}
