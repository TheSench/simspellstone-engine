import { expect } from 'chai';

export function testNegation(skill, negator) {
  if (negator) {
    describe(`when targetting units that are ${negator}`, () => {
      let target;

      beforeEach(() => {
        target = createTestUnit({ healthLeft: 5, timer: 0, invisible: 5, nullified: 5 });
      });

      it('should NOT affect them', () => {
        let affected = protect.affectTarget(skill, null, target, 5);

        expect(affected).to.be.false;
      });

      it(`should decrement ${negator}`, () => {
        protect.affectTarget(skill, null, target, 5);

        expect(target.status[negator], negator).to.equal(4);
      });

      it(`should ONLY modify the ${negator} status`, () => {
        let expectedStatus = Object.assign({}, target.status);
        expectedStatus[negator] = 4;

        protect.affectTarget(skill, null, target, 5);

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
      });

      it(`should NOT modify the state`, () => {
        let originalState = target.state;

        protect.affectTarget(skill, null, target, 5);

        expect(target.state, "target.state").to.equal(originalState);
      });
    });
  }
}
