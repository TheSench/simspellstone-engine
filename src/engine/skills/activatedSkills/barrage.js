import createDamageSkill from './damageSkill';

var skillBase = createDamageSkill({
  hexed: false
});

const getFinalTargetsBase = skillBase.getFinalTargets;
const getSkillValueBase = skillBase.getSkillValue;
const performSkillBase = skillBase.performSkill;

export default Object.assign(
  skillBase,
  {
    getFinalTargets(skill, filteredTargets) {
      return getFinalTargetsBase.call(this, skill, filteredTargets);
    },

    // eslint-disable-next-line no-unused-vars
    getSkillValue(skill, source) {
      // Barrage always deals 1 damage
      return 1;
    },

    performSkill(skill, source, field) {
      // The "value" of Barrage is how many times it fires
      var iterations = getSkillValueBase.call(this, skill, source);

      // TODO: Optimize this so we get targets once, and then just trim dead units
      let affected = 0;
      for (let i = iterations; i > 0; i--) {
        affected += performSkillBase.call(this, skill, source, field);
      }
      return affected;
    }
  }
);
