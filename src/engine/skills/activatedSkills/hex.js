import createDebuffSkill from './debuffSkill';

export default Object.assign(
  createDebuffSkill(),
  {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.status.hexed += baseValue;
    }
  }
);
