import CombatSkillBase from "./../combatSkillBase";

export default class Berserk extends CombatSkillBase {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      attacker.status.attackBerserk += baseValue;
    }
}
