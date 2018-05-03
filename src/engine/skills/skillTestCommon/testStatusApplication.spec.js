import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';

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
