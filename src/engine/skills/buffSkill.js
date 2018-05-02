import SkillBase from './skillBase';

export default class BuffSkill extends SkillBase {
    constructor() {
        super('nullified');
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
        filters.push((unit) => unit.state.active);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.owner].units;
    }
}
