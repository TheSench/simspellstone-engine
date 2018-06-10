import createBuffSkill from './buffSkill';

export default Object.assign(
  createBuffSkill('nullified'),
  {
    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
      filters.push((unit) => unit.damageTaken() > 0);
    },

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.healDamage(baseValue);
    }
  }
);
