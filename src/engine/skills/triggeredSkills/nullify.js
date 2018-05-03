import TriggeredSkillBase from "./triggeredSkillBase";

export default class Nullify extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.nullified += baseValue;
    }
}