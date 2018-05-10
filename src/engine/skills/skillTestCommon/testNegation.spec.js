import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';

export function testNegation({ executeSkill }, negator) {
  if (negator) {
    describe(`when targetting units that are ${negator}`, () => {
      let target,
        skillInstance;

      beforeEach(() => {
        target = createTestUnit({ status: { invisible: 5, nullified: 5 } });
        skillInstance = { value: 5 };
      });

      it('should NOT affect them', () => {
        let affected = executeSkill(skillInstance, target);

        expect(affected).to.be.false;
      });

      it(`should decrement ${negator}`, () => {
        executeSkill(skillInstance, target);

        expect(target.status[negator], negator).to.equal(4);
      });

      it(`should ONLY modify the ${negator} status`, () => {
        let expectedStatus = Object.assign({}, target.status);
        expectedStatus[negator] = 4;

        executeSkill(skillInstance, target);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });

      it(`should NOT modify the state`, () => {
        let originalState = target.state;

        executeSkill(skillInstance, target);

        expect(target.state, "target.state").to.equal(originalState);
      });
    });
  }

  ['invisible', 'nullified'].filter(status => status !== negator).forEach(status => {

    describe(`when targetting units that are ${status}`, () => {
      it('should affect them', () => {
        let target = createTestUnit({ status: { [status]: 5 } });
        let skillInstance = { value: 5 };

        let affected = executeSkill(skillInstance, target);

        expect(affected).to.be.true;
      });
    });
  });
}
