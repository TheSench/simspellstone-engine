import TriggeredSkillBase from "./triggeredSkillBase";

export default class Corrosive extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackCorroded += baseValue;
        target.status.corroded += baseValue;
        target.status.corrodedTimer = 2;
    }
}