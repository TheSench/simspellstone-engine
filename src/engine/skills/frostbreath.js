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
        // TODO: Define source.opponent
        var start = Math.max(source.position - 1, 0);
        var end = source.position + 3;
        return field[source.oppopnent].units.slice(start, end);
    }
}
