import createTurnSkillBase from "./../turnSkillBase";

export default Object.assign(
  createTurnSkillBase(),
  {
    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, source, field, baseValue) {
      source.status.stasisField += baseValue;
    }
  }
);
