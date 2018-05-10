import { expect } from 'chai';
import { orListFromArray } from '../../../../helpers/orListFromArray';
import { createTestUnit } from './../../../unitFactory/unitFactory';
import states from './../../../unitFactory/unitStates';

export function testStatusApplication({ executeSkill }, affectedStatus, stacks, setsOtherStatuses) {
  describe('basic effects', () => {
    let target,
      skillInstance;

    beforeEach(() => {
      skillInstance = { id: 'theSkill', value: null };
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = executeSkill(skillInstance, target);

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        executeSkill(skillInstance, target);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks) {
        it(`should stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          executeSkill(skillInstance, target);

          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        it(`should NOT stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 3;

          executeSkill(skillInstance, target);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT stack replace higher values of ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          executeSkill(skillInstance, target);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });
      }

      if (!setsOtherStatuses) {
        it(`should ONLY modify ${affectedStatus}`, () => {
          let expectedStatus = Object.assign({}, target.status, { [affectedStatus]: 5 });

          executeSkill(skillInstance, target);

          expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
      }
    }
  });
}

export function shouldApplyStatus({ executeSkill }, affectedStatus, stacks, flatValue) {
  describe('basic effects', () => {
    let target;
    let skillInstance;

    beforeEach(() => {
      skillInstance = { id: 'theSkill', value: 5 };
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = executeSkill(skillInstance, target);

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        executeSkill(skillInstance, target);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks === "replace") {
        it(`should replace higher values of ${affectedStatus} with its value`, () => {
          target.status[affectedStatus] = 10;

          executeSkill(skillInstance, target);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should replace lower values of ${affectedStatus} with its value`, () => {
          target.status[affectedStatus] = 5;
          skillInstance.value = 10;

          executeSkill(skillInstance, target);

          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        if (stacks) {
          it(`should stack with previous ${affectedStatus}`, () => {
            target.status[affectedStatus] = 5;

            executeSkill(skillInstance, target);

            expect(target.status[affectedStatus], affectedStatus).to.equal(10);
          });
        } else {
          if (flatValue) {
            it(`should always set value of ${affectedStatus} to ${flatValue}`, () => {
              target.status[affectedStatus] = 99;
              skillInstance.value = 3;

              executeSkill(skillInstance, target);

              expect(target.status[affectedStatus], affectedStatus).to.equal(flatValue);
            });
          } else {
            it(`should replace lower values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 3;

              executeSkill(skillInstance, target);

              expect(target.status[affectedStatus], affectedStatus).to.equal(5);
            });

            it(`should NOT replace higher values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 99;

              skillInstance.value = 3;
              executeSkill(skillInstance, target);

              expect(target.status[affectedStatus], affectedStatus).to.equal(99);
            });
          }
        }
      }
    }
  });
}

export function shouldNotApplyStatusesOtherThan({ executeSkill }, statuses) {
  let affectedStatusList = orListFromArray(statuses);

  it(`should ONLY modify ${affectedStatusList}`, () => {
    let target = createTestUnit();
    let skillInstance = { id: 'theSkill', value: null };
    let expectedStatus = Object.assign({}, target.status);

    executeSkill(skillInstance, target);

    statuses.forEach((status) => expectedStatus[status] = target.status[status]);
    expect(target.status, "target.status").to.deep.equal(expectedStatus);
  });
}

export function shouldChangeStateTo({ executeSkill }, desiredState) {
  it(`should change state to ${desiredState}`, () => {
    let target = createTestUnit();
    let skillInstance = { id: 'theSkill', value: null };

    executeSkill(skillInstance, target);

    expect(target.state, "target.state").to.equal(states[desiredState]);
  });
}
