import TriggeredSkillBase from "./../triggeredSkillBase";

export default class Regenerate extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.healDamage(baseValue);
    }
}