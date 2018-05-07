import TurnSkillBase from "./../turnSkillBase";

export default class Regenerate extends TurnSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, source, field, baseValue) {
    source.healDamage(baseValue);
  }
}
