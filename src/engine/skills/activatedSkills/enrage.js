import createBuffSkill from './buffSkill';

export default Object.assign(
  createBuffSkill(),
  {
    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    },

    doAffectTarget(skill, source, target, baseValue) {
      target.status.enraged += baseValue;
    }
  }
);
