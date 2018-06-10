import createBuffSkill from './buffSkill';

export default Object.assign(
  createBuffSkill({ negatedBy: null }),
  {
    doAffectTarget(skill, source, target, baseValue) {
      target.status.attackEmpower += baseValue;
    }
  }
);
