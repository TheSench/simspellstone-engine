import BuffSkill from './buffSkill';

export default class WingWard extends BuffSkill{
    constructor() {
        super('nullified');
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.protection += baseValue;
        target.status.invisible += baseValue;
    }
}
