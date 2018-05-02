import DebuffSkill from './debuffSkill';

export default class Scorch extends DebuffSkill {
    constructor() {
        super({negatedBy: null}), true;
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    }
    
    getPotentialTargets(source, field) {
        return field[source.opponent].units.slice(source.position, source.position+1);
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        var targetStatus = target.status;
        targetStatus.scorched += baseValue;
        targetStatus.scorchTimer = 2;
    }
}
