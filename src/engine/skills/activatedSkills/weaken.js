import createDebuffSkill from './debuffSkill';

export default Object.assign(
  createDebuffSkill(),
  {
    addSingleTargetFilters(skill, filters) {
      filters.push((unit) => unit.state.willAttack);
    },

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.status.attackWeaken += baseValue;
    }
  }
);
