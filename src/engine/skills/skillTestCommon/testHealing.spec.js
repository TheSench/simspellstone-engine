import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';

export function testHealing(skill) {

  describe('basic healing', () => {
    let target;
    let origStatus;
    let affected;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
      origStatus = Object.assign({}, target.status);
      affected = skill.affectTarget(null, null, target, 4);
    });

    it('should affect them', () => {
      expect(affected).to.equal(true);
    });

    it('should add health equal to its value', () => {
      expect(target.status.healthLeft, "healthLeft").to.equal(9);
    });

    it('should ONLY modify healthLeft', () => {
      let expectedStatus = Object.assign({}, origStatus, { healthLeft: 9 });

      expect(target.status, "target.status").to.deep.equal(expectedStatus);
    });
  });

  describe('boundary cases', () => {
    let target;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
    });

    it('should not heal negative health', () => {
      skill.affectTarget(null, null, target, -6);

      expect(target.status.healthLeft, "healthLeft").to.equal(5);
    });

    it('should not heal above starting health', () => {
      skill.affectTarget(null, null, target, 6);

      expect(target.status.healthLeft, "healthLeft").to.equal(10);
    });
  })
}
