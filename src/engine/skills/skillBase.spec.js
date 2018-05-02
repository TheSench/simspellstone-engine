import { expect } from 'chai';

export function testNegation() {
  describe('when targetting units that are nullified', () => {
    let target;
    let affected;

    beforeEach(() => {
        target = createTestUnit({ healthLeft: 5, timer: 0 });
        affected = protect.affectTarget(skill, null, target, 5);
    });

    it('should NOT affect them', () => {
        expect(affected).to.be.false;
    });

    it('should decrement nullified', () => {
        expect(target.status.nullified, "nullified").to.equal(4);
    });

    it('should ONLY modify nullified', () => {
        let expectedStatus = Object.assign({}, baseStatus, { nullified: 4 });

        expect(target.status, "target.status").to.deep.equal(expectedStatus);
    });
});
}
