import SkillBase from './skillBase';

export default class Weaken extends SkillBase{
    constructor() {
        super('invisible');
    }

    getFilters(skill) {
        let filters = super.getFilters(skill);
        filters.push((unit) => unit.state.willBeActive);
        return filters;
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    getSkillValue() {
        return null;
    }
    
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.state = target.state.freeze();
    }
}
