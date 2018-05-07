export default class TurnSkillBase {
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

    performSkill(skill, source, field) {
        let baseValue = this.getSkillValue(skill, source);
        this.doPerformSkill(skill, source, field, baseValue);
    }

    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, source, field, baseValue) {
    }
}
