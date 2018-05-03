import TriggeredSkillBase from "./triggeredSkillBase";

export default class Invisibility extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.invisible += baseValue;
    }
}