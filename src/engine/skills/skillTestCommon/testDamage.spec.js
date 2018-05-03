import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';

const defaultDamageModifiers = {
  armored: false,
  hexed: true,
  warded: true,
  protection: true
};
const damageModifierTypes = {
  armored: {
    effect: -1,
    constant: true
  },
  hexed: {
    effect: 1,
    constant: true
  },
  warded: {
    effect: -1,
    constant: false
  },
  protection: {
    effect: -1,
    constant: false
  }
};
export function testDamage(skill, damageModifierOverrides, setsOtherStatuses) {

  describe('basic damage dealing', () => {
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

    it('should remove health equal to its value', () => {
      expect(target.status.healthLeft, "healthLeft").to.equal(1);
    });

    if (!setsOtherStatuses) {
      it('should ONLY modify healthLeft', () => {
        let expectedStatus = Object.assign({}, origStatus, { healthLeft: 1 });

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });
    }
  });

  describe("modifying target's state", () => {
    let target;

    beforeEach(() => {
      target = createTestUnit({ status: { healthLeft: 5 } });
    });

    it('should NOT mark unit as dead when healthLeft is above 0', () => {
      skill.affectTarget(null, null, target, 4);

      expect(target.state.alive, "isAlive").to.be.true;
    });

    it('should mark unit as dead when healthLeft is exactly 0', () => {
      skill.affectTarget(null, null, target, 5);

      expect(target.state.alive, "isAlive").to.be.false;
    });

    it('should mark unit as dead when healthLeft is less than 0', () => {
      skill.affectTarget(null, null, target, 6);

      expect(target.state.alive, "isAlive").to.be.false;
    });
  });

  describe("interaction with other statuses", () => {
    let damageModifiers = Object.assign({}, defaultDamageModifiers, damageModifierOverrides);

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 1 } });
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        skill.affectTarget(null, null, target, 2);

        expect(target.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 2 } });
          skill.affectTarget(null, null, target, 1);

          expect(target.status.healthLeft, "healthLeft").to.equal(5);
        });
      });

    Object.entries(damageModifierTypes)
      .forEach(([modifierName, { constant }]) => {
        let should = (constant ? 'should NOT' : 'should');

        it(`${should} reduce ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 2 } });
          let expectedValue = (constant ? 2 : 1);

          skill.affectTarget(null, null, target, 1);

          expect(target.status[modifierName], modifierName).to.equal(expectedValue);
        });

        if (!constant) {
          it(`should never reduce ${modifierName} below 0`, () => {
            let target = createTestUnit({ status: { healthLeft: 5, [modifierName]: 1 } });

            skill.affectTarget(null, null, target, 2);

            expect(target.status[modifierName], modifierName).to.equal(0);
          });
        }
      });

    if (damageModifiers.warded && damageModifiers.protection) {
      it(`should reduce warded before protection`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, warded: 4, protection: 4 } });

        skill.affectTarget(null, null, target, 5);

        expect(target.status.warded, "warded").to.equal(0);
        expect(target.status.protection, "protection").to.equal(3);
      });
    }
  });
}
