import { expect } from 'chai';
import { orListFromArray } from '../../../helpers/orListFromArray';
import { createTestUnit } from "../../unitFactory/unitFactory";

export const applicationTypes = {
  stack: 'applicationType.stack',
  max: 'applicationType.max',
  replace: 'applicationType.replace'
};

export function shouldApplyStatusTo({executeSkill, target}, affectedStatus, applicationType) {
  describe(`effect on ${target}.status.${affectedStatus}`, () => {
    let targetUnit,
      skillInstance;

    beforeEach(() => {
      targetUnit = createTestUnit();
      skillInstance = { value: 5 };
    });

    switch (applicationType) {
      case applicationTypes.max:
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
        it(`should stack with previous ${affectedStatus}`, () => {
          targetUnit.status[affectedStatus] = 3;

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(8);
        });
        break;
      default:
        [1, 99].forEach(function replaceStatus(flatValue) {
          it(`should always set value of ${affectedStatus} to skill value`, () => {
            let expectedValue = (applicationType !== applicationTypes.replace ? applicationType : skillInstance.value);

            targetUnit.status[affectedStatus] = flatValue;

            executeSkill(skillInstance, targetUnit);

            expect(targetUnit.status[affectedStatus], affectedStatus).to.equal(expectedValue);
          });
        });
        break;
    }
  });
}

export function shouldAffectNoOtherStatuses({executeSkill, affectedStatuses, target}) {
  describe(`No other modifications to ${target}.status`, () => {
    let description = (affectedStatuses.length
      ? `should only modify ${orListFromArray(affectedStatuses)}`
      : 'should NOT modify any statuses')
    it(description, () => {
      let targetUnit = createTestUnit(),
        expectedStatus = Object.assign({}, targetUnit.status);

      executeSkill({ value: 5 }, targetUnit);
      affectedStatuses.forEach((status) => expectedStatus[status] = targetUnit.status[status]);

      expect(targetUnit.status, "target.status").to.deep.equal(expectedStatus);
    });
  });
}
