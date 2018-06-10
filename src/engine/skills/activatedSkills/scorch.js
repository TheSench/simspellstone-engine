import createDebuffSkill from './debuffSkill';

export default Object.assign(
  createDebuffSkill({ negatedBy: null }),
  {
    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    },

    getPotentialTargets(source, field) {
      return field[source.opponent].units.slice(source.position, source.position + 1);
    },

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets.slice(0, 1);
    },

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.applyScorch(baseValue);
    }
  }
);
