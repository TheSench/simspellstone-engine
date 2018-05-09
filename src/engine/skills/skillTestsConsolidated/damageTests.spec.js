import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from '../../unitFactory/unitFactory';

export function testHealingOrDamage(executeSkill, dealOrHeal, { sourceStatus, flatValue } = {}) {
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
