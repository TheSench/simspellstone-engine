import CombatSkillBase from './../combatSkillBase';

export default class Poison extends CombatSkillBase {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      defender.applyPoison(baseValue);
    }
}
