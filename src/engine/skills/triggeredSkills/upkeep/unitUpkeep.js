import createTurnSkillBase from "./../turnSkillBase";

export default Object.assign(
  createTurnSkillBase(),
  {
    // eslint-disable-next-line no-unused-vars
    getSkillValue(skill, source) {
    },

    // eslint-disable-next-line no-unused-vars
    doPerformSkill(skill, source, field, baseValue) {
      let status = source.status;

      status.hexed = 0;
      status.enraged = 0;
      status.protection = 0;
    }
  }
);
