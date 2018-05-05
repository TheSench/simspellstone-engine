import CombatSkillBase from './../combatSkillBase';

export default class Siphon extends CombatSkillBase {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      attacker.healDamage(baseValue);
    }
}
