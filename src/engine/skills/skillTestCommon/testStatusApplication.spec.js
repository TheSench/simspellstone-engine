import { expect } from 'chai';
import { orListFromArray } from '../../../helpers/orListFromArray';
import { createTestUnit } from './../../unitFactory/unitFactory';
import states from './../../unitFactory/unitStates';

export function testStatusApplication(skill, affectedStatus, stacks, setsOtherStatuses) {
  describe('basic effects', () => {
    let target,
      skillInstance;

    beforeEach(() => {
      skillInstance = { id: 'theSkill', value: null };
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = callAffectTarget(skill, skillInstance, null, target, 5)

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        callAffectTarget(skill, skillInstance, null, target, 5)

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks) {
        it(`should stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          callAffectTarget(skill, skillInstance, null, target, 5)

          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        it(`should NOT stack with previous ${affectedStatus}`, () => {
          target.status[affectedStatus] = 3;

          callAffectTarget(skill, skillInstance, null, target, 5)

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });

        it(`should NOT stack replace higher values of ${affectedStatus}`, () => {
          target.status[affectedStatus] = 5;

          callAffectTarget(skill, skillInstance, null, target, 3)

          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });
      }

      if (!setsOtherStatuses) {
        it(`should ONLY modify ${affectedStatus}`, () => {
          let expectedStatus = Object.assign({}, target.status, { [affectedStatus]: 5 });

          callAffectTarget(skill, skillInstance, null, target, 5)

          expect(target.status, "target.status").to.deep.equal(expectedStatus);
        });
      }
    }
  });
}

export function shouldApplyStatus(skill, affectedStatus, stacks, flatValue) {
  describe('basic effects', () => {
    let target;
    let skillInstance;

    beforeEach(() => {
      skillInstance = { id: 'theSkill', value: 5 };
      target = createTestUnit();
    });

    it('should affect target', () => {
      let affected = callAffectTarget(skill, skillInstance, null, target, skillInstance.value)

      expect(affected).to.equal(true);
    });

    if (affectedStatus === undefined) {
      it('should NOT modify any status fields', () => {
        let expectedStatus = Object.assign({}, target.status);

        callAffectTarget(skill, skillInstance, null, target, skillInstance.value)

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    } else {
      if (stacks === "replace") {
        it(`should replace higher values of ${affectedStatus} with its value`, () => {
          target.status[affectedStatus] = 10;
          callAffectTarget(skill, skillInstance, null, target, skillInstance.value)
          expect(target.status[affectedStatus], affectedStatus).to.equal(5);
        });
        
        it(`should replace lower values of ${affectedStatus} with its value`, () => {
          target.status[affectedStatus] = 5;
          skillInstance.value = 10;
          callAffectTarget(skill, skillInstance, null, target, skillInstance.value)
          expect(target.status[affectedStatus], affectedStatus).to.equal(10);
        });
      } else {
        if (stacks) {
          it(`should stack with previous ${affectedStatus}`, () => {
            target.status[affectedStatus] = 5;

            callAffectTarget(skill, skillInstance, null, target, skillInstance.value)

            expect(target.status[affectedStatus], affectedStatus).to.equal(10);
          });
        } else {
          if (flatValue) {
            it(`should always set value of ${affectedStatus} to ${flatValue}`, () => {
              target.status[affectedStatus] = 99;

              skillInstance.value = 3;
              callAffectTarget(skill, skillInstance, null, target, skillInstance.value)

              expect(target.status[affectedStatus], affectedStatus).to.equal(flatValue);
            });
          } else {
            it(`should replace lower values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 3;
  
              callAffectTarget(skill, skillInstance, null, target, skillInstance.value)
  
              expect(target.status[affectedStatus], affectedStatus).to.equal(5);
            });
            
            it(`should NOT replace higher values of ${affectedStatus}`, () => {
              target.status[affectedStatus] = 99;

              skillInstance.value = 3;
              callAffectTarget(skill, skillInstance, null, target, skillInstance.value)

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
    let skillInstance = { id: 'theSkill', value: null };
    let expectedStatus = Object.assign({}, target.status);

    callAffectTarget(skill, skillInstance, null, target, 5)
    statuses.forEach((status) => expectedStatus[status] = target.status[status]);

    expect(target.status, "target.status").to.deep.equal(expectedStatus);
  });
}

export function shouldChangeStateTo(skill, desiredState) {
  it(`should change state to ${desiredState}`, () => {
    let target = createTestUnit();
    let skillInstance = { id: 'theSkill', value: null };
    callAffectTarget(skill, skillInstance, null, target, null)

    expect(target.state, "target.state").to.equal(states[desiredState]);
  });
}

function callAffectTarget(skill, skillInstance, source, target, value) {
  skillInstance.value = value;
  return skill.affectTarget(skillInstance, source, target, value);
}