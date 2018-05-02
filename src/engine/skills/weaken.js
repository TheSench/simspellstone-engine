import SkillBase from './skillBase';

export default class Weaken extends SkillBase{
    constructor() {
        super('invisible');
    }

    addSingleTargetFilters(skill, filters) {
        filters.push((unit) => unit.state.willAttack);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackWeaken += baseValue;
    }
}
