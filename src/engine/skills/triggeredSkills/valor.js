import TriggeredSkillBase from "./triggeredSkillBase";

export default class Valor extends TriggeredSkillBase {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackValor = baseValue;
        target.status.valorTriggered = true;
    }
}