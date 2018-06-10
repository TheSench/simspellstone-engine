import BuffSkill from './buffSkill';

export default Object.assign(
  new BuffSkill(),
  {
    doAffectTarget(skill, source, target, baseValue) {
      target.status.attackEmpower += baseValue;
    }
  }
);
