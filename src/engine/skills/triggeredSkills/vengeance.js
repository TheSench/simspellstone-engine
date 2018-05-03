import TriggeredSkillBase from "./triggeredSkillBase";

export default class Vengeance extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        let totalDamage = baseValue;
        totalDamage = target.applyWard(totalDamage);
        totalDamage = target.applyProtect(totalDamage);
        
        target.takeDamage(totalDamage);
    }
}