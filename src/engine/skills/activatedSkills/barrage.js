import DamageSkill from './damageSkill';

var skillBase = new DamageSkill({
  hexed: false
});

export const barrage = Object.assign(
  Object.create(skillBase),
  {
    getFinalTargets(skill, filteredTargets) {
      return skillBase.getFinalTargets(skill, filteredTargets);
    },

    // eslint-disable-next-line no-unused-vars
    getSkillValue(skill, source) {
      // Barrage always deals 1 damage
      return 1;
    },

    performSkill(skill, source, field) {
      // The "value" of Barrage is how many times it fires
      var iterations = skillBase.getSkillValue(skill, source);

      // TODO: Optimize this so we get targets once, and then just trim dead units
      let affected = 0;
      for (let i = iterations; i > 0; i--) {
        affected += skillBase.performSkill(skill, source, field);
      }
      return affected;
    }
  }
);
