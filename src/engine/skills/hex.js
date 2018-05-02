import SkillBase from './skillBase';

export default class Hex extends SkillBase{
    constructor() {
        super('invisible');
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        target.status.hexed += baseValue;
    }
}
