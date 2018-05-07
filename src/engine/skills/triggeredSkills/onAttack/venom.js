import CombatSkillBase from './../combatSkillBase';

export default class Venom extends CombatSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, attacker, defender, baseValue) {
    defender.applyVenom(baseValue);
    defender.status.hexed += baseValue;
  }
}
