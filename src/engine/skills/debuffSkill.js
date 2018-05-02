import SkillBase from './skillBase';

const defaultConfig = {
    negatedBy: 'invisible'
};

export default class DebuffSkill extends SkillBase{
    constructor(overrides) {
        let config = Object.assign({}, defaultConfig, overrides);

        super(config.negatedBy);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.opponent].units;
    }
}
