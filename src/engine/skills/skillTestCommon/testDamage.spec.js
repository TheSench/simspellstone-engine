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
    constant: true,
    loc: 'passives'
  },
  hexed: {
    effect: 1,
    constant: true,
    loc: 'status'
  },
  warded: {
    effect: -1,
    constant: false,
    loc: 'status'
  },
  protection: {
    effect: -1,
    constant: false,
    loc: 'status'
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

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect, loc }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        let target = createTestUnit({ status: { healthLeft: 5 } });
        Object.assign(target[loc], {[modifierName]: 1});
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        skill.affectTarget(null, null, target, 2);

        expect(target.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName, {loc}]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5 } });
          Object.assign(target[loc], {[modifierName]: 2});
          skill.affectTarget(null, null, target, 1);

          expect(target.status.healthLeft, "healthLeft").to.equal(5);
        });
      });

    Object.entries(damageModifierTypes)
      .forEach(([modifierName, { constant, loc }]) => {
        let reduced = (damageModifiers[modifierName] ? !constant : false);
        let should = (reduced ? 'should' : 'should NOT');

        it(`${should} reduce ${modifierName}`, () => {
          let target = createTestUnit({ status: { healthLeft: 5 } });
          Object.assign(target[loc], {[modifierName]: 2});
          let expectedValue = (reduced ? 1 : 2);

          skill.affectTarget(null, null, target, 1);

          expect(target[loc][modifierName], modifierName).to.equal(expectedValue);
        });

        if (reduced) {
          it(`should never reduce ${modifierName} below 0`, () => {
            let target = createTestUnit({ status: { healthLeft: 5 } });
            Object.assign(target[loc], {[modifierName]: 2});

            skill.affectTarget(null, null, target, 2);

            expect(target[loc][modifierName], modifierName).to.equal(0);
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

      it(`should have damage reduced by both warded and protection`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, warded: 1, protection: 1 } });

        skill.affectTarget(null, null, target, 3);

        expect(target.status.healthLeft, "healthLeft").to.equal(4);
      });
    }

    if (damageModifiers.armored && damageModifiers.protection) {
      it(`should reduce protection even if it would be blocked by armor`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, protection: 4 }, passives: {armored: 4} });

        skill.affectTarget(null, null, target, 5);

        expect(target.status.protection, "protection").to.equal(0);
        expect(target.passives.armored, "armored").to.equal(4);
      });

      it(`should have damage reduced by both armored and protection`, () => {
        let target = createTestUnit({ status: { healthLeft: 5, protection: 1 }, passives: {armored: 1} });

        skill.affectTarget(null, null, target, 3);

        expect(target.status.healthLeft, "healthLeft").to.equal(4);
      });
    }
  });
}
