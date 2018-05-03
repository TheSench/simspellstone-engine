import BuffSkill from './buffSkill';

export default class Legion extends BuffSkill {
    constructor() {
        super();
    }

    getPotentialTargets(source, field) {
        let allies = field[source.owner].units;

        let potentialTargets = [];
        if (source.position > 0) {
            potentialTargets.push(allies[source.position - 1]);
        }
        if (source.position < allies.length - 1) {
            potentialTargets.push(allies[source.position + 1]);
        }
        return potentialTargets;
    }

    getFinalTargets(skill, filteredTargets) {
        return filteredTargets;
    }

    doAffectTarget(skill, source, target, baseValue) {
        target.status.attackEmpower += baseValue;
    }
}
