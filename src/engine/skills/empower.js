import SkillBase from './skillBase';

export default class Empower extends SkillBase{
    constructor() {
        super('nullified');
    }

    getFilters(skill) {
        return super.getFilters(skill);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackEmpower += baseValue;
    }
}
