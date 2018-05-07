import { expect } from 'chai';
import { createTestUnit } from '../../unitFactory/unitFactory';

export function changeSkillTo(skill, newSkillID) {
    describe('effects on skill instance', () => {
        it('', () => {
            let source = createTestUnit();
            let target = createTestUnit();
            let skillInstance = { id: 'theSkill', value: null };

            skill.affectTarget(skillInstance, source, target, skillInstance.value);

            expect(skillInstance.id).to.equal(newSkillID);
        });
    });
}