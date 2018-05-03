import DamageSkill from './damageSkill';

export default class Frostbreath extends DamageSkill{
    constructor() {
        super({
            hex: true,
            ward: true,
            protect: true,
            armor: false
        });
    }

    getPotentialTargets(source, field) {
        var start = Math.max(source.position - 1, 0);
        var end = source.position + 2;
        return field[source.opponent].units.slice(start, end);
    }

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets;
    }
}
