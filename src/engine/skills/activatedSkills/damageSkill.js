import R from 'ramda';
import ActivatedSkillBase from './activatedSkillBase';

const damageModifiers = {
    hexed: ([skill, source, target, damage]) => [skill, source, target, damage + target.status.hexed],
    warded: ([skill, source, target, damage]) => [skill, source, target, target.applyWard(damage)],
    protection: ([skill, source, target, damage]) => [skill, source, target, target.applyProtect(damage)],
    armored: ([skill, source, target, damage]) => [skill, source, target, Math.max(damage - target.passives.armored, 0)]
};

const damageModifiersOrdered = ['hexed', 'warded', 'protection', 'armored'];

const configDefaults = {
    negatedBy: 'invisible',
    hexed: true,
    warded: true,
    protection: true,
    armored: false
};

export default class DamageSkill extends ActivatedSkillBase {
     constructor(configOverrides) {
        let config = Object.assign({}, configDefaults, configOverrides);

        super(config.negatedBy);

        var modifiers = R.pipe(...damageModifiersOrdered.filter(key => config[key]).map((key) => damageModifiers[key]));

        if (modifiers.length) {
            this.calculateDamage = function(skill, source, target, baseDamage) {
                return modifiers([skill, source, target, baseDamage])[3];
            };
        }
    }

    getPotentialTargets(source, field) {
        // TODO: Define source.opponent
        return field[source.opponent].units;
    }

    calculateDamage(skill, source, target, baseDamage) {
        return baseDamage;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        let totalDamage = this.calculateDamage(skill, source, target, baseValue);

        target.takeDamage(totalDamage);

        return totalDamage;
    }
}
