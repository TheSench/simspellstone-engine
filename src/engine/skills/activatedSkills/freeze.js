import createActivatedSkill from './activatedSkillBase';

export default Object.assign(
  createActivatedSkill('invisible'),
  {
    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
      filters.push((unit) => unit.state.willBeActive);
    },

    getPotentialTargets(source, field) {
      // TODO: Define source.opponent
      return field[source.opponent].units;
    },

    getSkillValue() {
      return null;
    },

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.freeze();
    }
  }
);
