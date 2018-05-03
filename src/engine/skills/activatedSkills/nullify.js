import DebuffSkill from './debuffSkill';

export default class Nullify extends DebuffSkill{
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.nullified += baseValue;
    }
}
