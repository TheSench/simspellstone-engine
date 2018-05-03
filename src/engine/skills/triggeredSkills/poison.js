import TriggeredSkillBase from "./triggeredSkillBase";

export default class Poison extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.applyPoison(baseValue);
    }
}