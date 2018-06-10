import createActivatedSkill from './activatedSkillBase';

const defaultConfig = {
  negatedBy: 'invisible'
};

const debuffSkillBase = {
  getPotentialTargets(source, field) {
    // TODO: Define source.opponent
    return field[source.opponent].units;
  }
};

export default function createDebuffSkill(overrides) {
  let config = Object.assign({}, defaultConfig, overrides);

  return Object.assign(
    createActivatedSkill(config.negatedBy),
    debuffSkillBase
  );
}
