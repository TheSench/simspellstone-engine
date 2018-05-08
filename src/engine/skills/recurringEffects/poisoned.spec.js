import { expect } from 'chai';
import sinon from 'sinon';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { poisoned } from './../skills';

describe('poisoned', () => {
  let unit,
    skillInstance;

  beforeEach(() => {
    unit = createTestUnit();
    skillInstance = { id: 'poisoned', value: 5 }
  });

  [1, 5, 99].forEach((value) => {
    it(`given a value of ${value}, it should reduce the unit's health by ${value}`, () => {
      sinon.spy(unit, "takeDamage");
      skillInstance.value = value;

      poisoned.apply(skillInstance, unit);

      expect(unit.takeDamage.calledWith(value), `dealt ${value} damage`).to.be.true;
    });
  });

  it('should not wear off');
});
