import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from './../../unitFactory/unitFactory';

export function shouldHealDamageEqualToValue(skill) {
  testHealing(skill);
}

export function shouldHealExactlyXDamage(skill, expectedDamage) {
  testHealing(skill, expectedDamage);
}

function testHealing(skill, flatHealing) {

  [1, 99].forEach((value) => {
    let description = (flatHealing ? 'given any value' : `given a value of ${value}`);
    let expectedHealing = (flatHealing || value);

    describe(description, () => {
      let target;

      beforeEach(() => {
        target = createTestUnit({ status: { healthLeft: 5 } });
        sinon.spy(target, "healDamage")

        skill.affectTarget(null, null, target, value);
      });

      afterEach(() => {
        target.healDamage.restore();
      });

      it(`should heal ${expectedHealing} damage`, () => {
        expect(target.healDamage.calledWithExactly(expectedHealing), `healed ${expectedHealing} damage`).to.be.true;
      });

      it('should only heal damage once', () => {
        expect(target.healDamage.callCount, "only healed damage once").to.equal(1);
      });
    });
  });
}
