const combatSkillBase = {
  getSkillValue(skill, source) {
      let value = skill.value;
      let enhanced = source.getEnhancement(skill.id);
      if (enhanced) {
          if (enhanced < 0) {
              enhanced = Math.ceil(value * -enhanced);
          }
          value += enhanced;
      }
  },

  performSkill(skill, source, triggeredBy) {
      let baseValue = this.getSkillValue(skill, source);
      this.doPerformSkill(skill, source, triggeredBy, baseValue);
  },

  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, source, triggeredBy, baseValue) {
  }
};

export default function createCombatSkill() {
  return Object.create(combatSkillBase);
}
