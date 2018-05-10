import { expect } from 'chai';
import { createTestUnit } from '../../../unitFactory/unitFactory';

export function changeSkillTo(skill, newSkillID) {
    describe('effects on skill instance', () => {
        it('', () => {
            let source = createTestUnit();
            let field = null;
            let skillInstance = { id: 'theSkill', value: null };

            skill.doPerformSkill(skillInstance, source, field, skillInstance.value);

            expect(skillInstance.id).to.equal(newSkillID);
        });
    });
}