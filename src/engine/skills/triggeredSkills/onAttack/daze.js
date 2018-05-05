import CombatSkillBase from './../combatSkillBase';

export default class Daze extends CombatSkillBase {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      defender.status.attackWeaken += baseValue;
    }
}
