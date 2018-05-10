import { expect } from 'chai';
import sinon from 'sinon';

export function testSkillDoesNothing(skill) {
    describe('basic effects', () => {
        beforeEach(function setupTest() {
            sinon.spy(skill, "doPerformSkill");
        });

        afterEach(function tearDownTest() {
            skill.doPerformSkill.restore();
        });

        it('should do nothing', () => {
            skill.performSkill(null, null, null);

            expect(skill.doPerformSkill.notCalled, "skill.doPerformSkill.notCalled").to.be.true;
        });
    });
}