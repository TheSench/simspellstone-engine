import BuffSkill from './buffSkill';

export default class Enrage extends BuffSkill {
    constructor() {
        super();
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    }

    doAffectTarget(skill, source, target, baseValue) {
        target.status.enraged += baseValue;
    }
}
