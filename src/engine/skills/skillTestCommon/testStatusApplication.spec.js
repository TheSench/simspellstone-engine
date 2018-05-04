import { expect } from 'chai';
import { orListFromArray } from '../../../helpers/orListFromArray';
import { createTestUnit } from './../../unitFactory/unitFactory';
import states from './../../unitFactory/unitStates';

export function testStatusApplication(skill, affectedStatus, stacks, setsOtherStatuses) {
  describe('basic effects', () => {
    let target;

    beforeEach(() => {
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = skill.affectTarget(null, null, target, 5);

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        skill.affectTarget(null, null, target, 5);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks) {
        it(`should stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          skill.affectTarget(null, null, target, 5);

          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        it(`should NOT stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 3;

          skill.affectTarget(null, null, target, 5);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT stack replace higher values of ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          skill.affectTarget(null, null, target, 3);

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });
      }

      if (!setsOtherStatuses) {
        it(`should ONLY modify ${affectedStatus}`, () => {
          let expectedStatus = Object.assign({}, target.status, { [affectedStatus]: 5 });

          skill.affectTarget(null, null, target, 5);

          expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
      }
    }
  });
}

export function shouldApplyStatus(skill, affectedStatus, stacks, flatValue) {
  describe('basic effects', () => {
    let target;

    beforeEach(() => {
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = skill.affectTarget(null, null, target, 5);

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        skill.affectTarget(null, null, target, 5);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks === "replace") {
        it(`should replace ${affectedStatus} with its value`, () => {
          target.status[affectedStatus] = 10;
          skill.affectTarget(null, null, target, 5);
          expect(target.status[affectedStatus], affectedStatus).to.equal(5);

          target.status[affectedStatus] = 5;
          skill.affectTarget(null, null, target, 10);
          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        if (stacks) {
          it(`should stack with previous ${affectedStatus}`, () => {
            target.status[affectedStatus] = 5;

            skill.affectTarget(null, null, target, 5);

            expect(target.status[affectedStatus], affectedStatus).to.equal(10);
          });
        } else {
          if (flatValue) {
            it(`should always set value of ${affectedStatus} to ${flatValue}`, () => {
              target.status[affectedStatus] = 99;

              skill.affectTarget(null, null, target, 3);

              expect(target.status[affectedStatus], affectedStatus).to.equal(flatValue);
            });
          } else {
            it(`should replace lower values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 3;
  
              skill.affectTarget(null, null, target, 5);
  
              expect(target.status[affectedStatus], affectedStatus).to.equal(5);
            });
            
            it(`should NOT replace higher values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 99;

              skill.affectTarget(null, null, target, 3);

              expect(target.status[affectedStatus], affectedStatus).to.equal(99);
            });
          }
        }
      }
    }
  });
}

export function shouldNotApplyStatusesOtherThan(skill, statuses) {
  let affectedStatusList = orListFromArray(statuses);

  it(`should ONLY modify ${affectedStatusList}`, () => {
    let target = createTestUnit();
    let expectedStatus = Object.assign({}, target.status);

    skill.affectTarget(null, null, target, 5);
    statuses.forEach((status) => expectedStatus[status] = target.status[status]);

    expect(target.status, "target.status").to.deep.equal(expectedStatus);
  });
}

export function shouldChangeStateTo(skill, desiredState) {
  it(`should change state to ${desiredState}`, () => {
    let target = createTestUnit();
    skill.affectTarget(null, null, target, null);

    expect(target.state, "target.state").to.equal(states[desiredState]);
  });
}