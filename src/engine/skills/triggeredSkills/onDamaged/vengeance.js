import CombatSkillBase from "./../combatSkillBase";

export default class Vengeance extends CombatSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, attacker, defender, baseValue) {
        let totalDamage = baseValue;
        totalDamage = attacker.applyWard(totalDamage);
        totalDamage = attacker.applyProtect(totalDamage);

        attacker.takeDamage(totalDamage);
    }
}
