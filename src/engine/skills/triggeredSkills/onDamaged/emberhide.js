import CombatSkillBase from "./../combatSkillBase";

export default class Emberhide extends CombatSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, attacker, defender, baseValue) {
    attacker.applyScorch(baseValue);
  }
}
