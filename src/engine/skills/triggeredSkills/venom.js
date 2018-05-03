import TriggeredSkillBase from "./triggeredSkillBase";

export default class Venom extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.applyVenom(baseValue);
        target.status.hexed += baseValue;
    }
}