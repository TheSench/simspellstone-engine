import TriggeredSkillBase from "./triggeredSkillBase";

export default class Fury extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        // TODO: Damage attacker and 'zerk self
        target.status.attackBerserk += baseValue;
    }
}