import TurnSkillBase from './../turnSkillBase';

export default class UnitEndTurn extends TurnSkillBase {
  // eslint-disable-next-line no-unused-vars
  getSkillValue(skill, source) {
  }

  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, source, field, baseValue) {
    let status = source.status;

    status.attackEmpower = 0;
    status.attackWeaken = 0;
    status.nullified = 0;
    status.silenced = false;
  }
}
