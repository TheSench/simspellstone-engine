import DebuffSkill from './debuffSkill';

export default class Hex extends DebuffSkill{
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.hexed += baseValue;
    }
}
