import SkillBase from './skillBase';

export default class DebuffSkill extends SkillBase{
    constructor() {
        super('invisible');
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }
}
