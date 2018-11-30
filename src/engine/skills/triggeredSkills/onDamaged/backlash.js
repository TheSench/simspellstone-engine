import createCombatSkill from '../combatSkillBase';

export default Object.assign(
  createCombatSkill(),
  {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      let totalDamage = baseValue;
      totalDamage = attacker.applyWard(totalDamage);
      totalDamage = attacker.applyProtect(totalDamage);

      attacker.takeDamage(totalDamage);
    }
  }
);
