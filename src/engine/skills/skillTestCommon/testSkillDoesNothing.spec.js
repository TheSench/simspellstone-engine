import { expect } from 'chai';
import sinon from 'sinon';

export function testSkillDoesNothing(skill) {
    describe('basic effects', () => {
        beforeEach(function setupTest() {
            sinon.spy(skill, "affectTarget");
        });

        afterEach(function tearDownTest() {
            skill.affectTarget.restore();
        });

        it('should do nothing', () => {
            skill.performSkill(null, null, null);

            expect(skill.affectTarget.notCalled, "skill.affectTarget.notCalled").to.be.true;
        });
    });
}