import BuffSkill from './buffSkill';

export default class Empower extends BuffSkill{
    constructor() {
        super();
    }

    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackEmpower += baseValue;
    }
}
