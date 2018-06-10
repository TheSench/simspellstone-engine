import createActivatedSkill from './activatedSkillBase';

const defaultConfig = {
  negatedBy: 'nullified'
};

const buffSkillBase = {
  // eslint-disable-next-line no-unused-vars
  addSingleTargetFilters(skill, filters) {
    filters.push((unit) => unit.state.active);
  },

  getPotentialTargets(source, field) {
    // TODO: Define source.opponent
    return field[source.owner].units;
  }
};

export default function createBuffSkill(overrides) {
  let config = Object.assign({}, defaultConfig, overrides);

  return Object.assign(
    createActivatedSkill(config.negatedBy),
    buffSkillBase
  );
}
