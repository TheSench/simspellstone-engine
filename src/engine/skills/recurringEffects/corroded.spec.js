import { expect } from 'chai';
import { createTestUnit } from "../../unitFactory/unitFactory";
import { corroded } from './../skills';

describe('corroded', () => {
  let unit,
    skillInstance;

  beforeEach(() => {
    unit = createTestUnit({ status: { corroded: 5 } });
    skillInstance = { id: 'corroded', value: 5 }
  });

  [1, 5, 99].forEach((value) => {
    it(`given a value of ${value}, it should reduce the unit's attack by ${value}`, () => {
      skillInstance.value = value;

      corroded.apply(skillInstance, unit);

      expect(unit.status.attackWeaken, `dealt ${value} damage`).to.equal(value);
    });
  });

  [5, 2, 1].forEach((timer) => {
    it('should reduce corrodedTimer', () => {
      unit.status.corrodedTimer = timer;

      corroded.apply(skillInstance, unit);

      expect(unit.status.corrodedTimer, `reduced corrodedTimer by 1`).to.equal(timer - 1);
    });
  });

  it('should not wear off when corrodedTimer is greater than zero', () => {
    unit.status.corrosionTimer = 2;
    unit.skills.turnEnd.push(skillInstance);

    corroded.apply(skillInstance, unit);

    expect(unit.skills.turnEnd.length, `corroded removed from turnEnd skills`).to.equal(1);
    expect(unit.status.corroded).to.be.greaterThan(0);
  });

  it('should wear off when corrodedTimer hits zero', () => {
    unit.status.corrosionTimer = 1;
    unit.skills.turnEnd.push(skillInstance);

    corroded.apply(skillInstance, unit);

    expect(unit.skills.turnEnd.length, `corroded removed from turnEnd skills`).to.equal(0);
    expect(unit.status.corroded).to.equal(0);
  });
});
