import ActivatedSkillBase from './activatedSkillBase';

const defaultConfig = {
    negatedBy: 'invisible'
};

export default class DebuffSkill extends ActivatedSkillBase{
    constructor(overrides) {
        let config = Object.assign({}, defaultConfig, overrides);

        super(config.negatedBy);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.opponent].units;
    }
}
