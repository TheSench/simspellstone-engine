import SkillBase from './skillBase';

export default class Bolt extends SkillBase{
    getFilters(skill) {
        return super.getFilters(skill);
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.oppopnent].units;
    }

    // eslint-disable-next-line no-unused-vars
    affectTarget(skill, source, target, baseValue) {
        // Check Invisible
        if (target.status.invisible) {
            target.status.invisible--;
            // TODO: Echo
            return false;
        }

        let damage = baseValue;

        target.status.healthLeft -= damage;
        
        return true;
    }
}
