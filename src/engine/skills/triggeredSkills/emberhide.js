import TriggeredSkillBase from "./triggeredSkillBase";

export default class Emberhide extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.applyScorch(baseValue);
    }
}