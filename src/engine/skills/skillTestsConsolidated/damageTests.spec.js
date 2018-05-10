import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from '../../unitFactory/unitFactory';

export function testHealingOrDamage({ executeSkill }, dealOrHeal, { sourceStatus, flatValue } = {}) {
  [1, 99].forEach((value) => {
    let description = (flatValue ? 'given any value' : `given a value of ${value}`);
    let expectedValue = (flatValue || value);
    let dealtOrHealed = (dealOrHeal === 'deal' ? 'dealt' : 'healed');
    let damageFnName = (dealOrHeal === 'deal' ? 'takeDamage' : 'healDamage');

    describe(description, () => {
      let unit,
        skillInstance,
        damageFn;

      beforeEach(() => {
        skillInstance = {
          id: "testSkill",
          value: (sourceStatus ? -1 : value)
        };

        unit = createTestUnit({ status: { healthLeft: 5 } });
        if (sourceStatus) {
          unit.status[sourceStatus] = value;
        }

        damageFn = sinon.spy(unit, damageFnName);

        executeSkill(skillInstance, unit);
      });

      afterEach(() => {
        damageFn.restore();
      });

      it(`should ${dealOrHeal} ${expectedValue} damage`, () => {
        expect(damageFn.calledWithExactly(expectedValue), `${dealtOrHealed} ${expectedValue} damage`).to.be.true;
      });

      it(`should only ${dealOrHeal} damage once`, () => {
        expect(damageFn.callCount, `only ${dealtOrHealed} damage once`).to.equal(1);
      });
    });
  });
}

export function testDamageModifiers({ executeSkill }, damageModifierList) {
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

  describe("interaction with other statuses", () => {
    let damageModifiers = damageModifierList.reduce((modifiers, modifier) => {
      modifiers[modifier] = true;
      return modifiers;
    },
      {
        armored: false,
        hexed: false,
        warded: false,
        protection: false
      });

    let skillInstance,
      targetUnit;

    beforeEach(() => {
      skillInstance = { value: 5 };
      targetUnit = createTestUnit({ status: { healthLeft: 8 } });
    });

    Object.entries(damageModifierTypes).forEach(([modifierName, { effect, loc }]) => {
      let isAffectedByStatus = damageModifiers[modifierName];
      let should = (isAffectedByStatus ? 'should' : 'should NOT');
      let effectType = (effect > 0 ? 'increased' : 'decreased');

      it(`${should} deal ${effectType} damage when unit has ${modifierName}`, () => {
        Object.assign(targetUnit[loc], { [modifierName]: 1 });
        let expectedHelth = 3 - (damageModifiers[modifierName] ? effect : 0);

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(expectedHelth);
      });
    });

    Object.entries(damageModifierTypes)
      .filter(([modifierName]) => damageModifiers[modifierName])
      .filter(([, { effect }]) => effect < 0)
      .forEach(([modifierName, { loc }]) => {
        it(`should never deal negative damage due to ${modifierName}`, () => {
          Object.assign(targetUnit[loc], { [modifierName]: 6 });

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit.status.healthLeft, "healthLeft").to.equal(8);
        });
      });

    Object.entries(damageModifierTypes)
      .forEach(([modifierName, { constant, loc }]) => {
        let reduced = (damageModifiers[modifierName] ? !constant : false);
        let should = (reduced ? 'should' : 'should NOT');

        it(`${should} reduce ${modifierName}`, () => {
          Object.assign(targetUnit[loc], { [modifierName]: 6 });
          let expectedValue = (reduced ? 1 : 6);

          executeSkill(skillInstance, targetUnit);

          expect(targetUnit[loc][modifierName], modifierName).to.equal(expectedValue);
        });

        if (reduced) {
          it(`should never reduce ${modifierName} below 0`, () => {
            Object.assign(targetUnit[loc], { [modifierName]: 2 });

            executeSkill(skillInstance, targetUnit);

            expect(targetUnit[loc][modifierName], modifierName).to.equal(0);
          });
        }
      });

    if (damageModifiers.warded && damageModifiers.protection) {
      it(`should reduce warded before protection`, () => {
        Object.assign(targetUnit.status, { warded: 4, protection: 4 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.warded, "warded").to.equal(0);
        expect(targetUnit.status.protection, "protection").to.equal(3);
      });

      it(`should have damage reduced by both warded and protection`, () => {
        Object.assign(targetUnit.status, { warded: 1, protection: 1 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }

    if (damageModifiers.armored && damageModifiers.protection) {
      it(`should reduce protection even if it would be blocked by armor`, () => {
        Object.assign(targetUnit.status, { protection: 4 });
        Object.assign(targetUnit.passives, { armored: 4 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.protection, "protection").to.equal(0);
        expect(targetUnit.passives.armored, "armored").to.equal(4);
      });

      it(`should have damage reduced by both armored and protection`, () => {
        Object.assign(targetUnit.status, { protection: 1 });
        Object.assign(targetUnit.passives, { armored: 1 });

        executeSkill(skillInstance, targetUnit);

        expect(targetUnit.status.healthLeft, "healthLeft").to.equal(5);
      });
    }
  });
}
