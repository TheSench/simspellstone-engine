import SkillBase from './skillBase';

export default class Bolt extends SkillBase{
    constructor() {
        super('invisible');
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        var targetStatus = target.status;
        
        let totalDamage = baseValue + targetStatus.hexed;
        totalDamage = target.applyWard(totalDamage);
        totalDamage = target.applyProtect(totalDamage);

        target.takeDamage(totalDamage);
    }
}
