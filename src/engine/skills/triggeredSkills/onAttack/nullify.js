import createCombatSkill from './../combatSkillBase';

export default Object.assign(
  createCombatSkill(),
  {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, attacker, defender, baseValue) {
      defender.status.nullified += baseValue;
    }
  }
);
