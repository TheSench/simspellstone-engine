import BuffSkill from './buffSkill';

export default class Enlarge extends BuffSkill {
    constructor() {
        super({ negatedBy: null });
    }

    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackEmpower += baseValue;
    }
}
