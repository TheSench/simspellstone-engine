export default class TriggeredSkillBase {
    getSkillValue(skill, source) {
        let value = skill.value;
        let enhanced = source.getEnhancement(skill.id);
        if (enhanced) {
            if (enhanced < 0) {
                enhanced = Math.ceil(value * -enhanced);
            }
            value += enhanced;
        }
    }

    performSkill(skill, source, target) {
        let baseValue = this.getSkillValue(skill, source);
        this.affectTarget(skill, source, target, baseValue);
    }

    // eslint-disable-next-line no-unused-vars
    affectTarget(skill, source, target, baseValue) {
        this.doAffectTarget(skill, source, target, baseValue);
        return true;
    }
}
