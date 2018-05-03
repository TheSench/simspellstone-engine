import SkillBase from './skillBase';
import R from 'ramda';

const damageModifiers = {
    hex: ([skill, source, target, damage]) => [skill, source, target, damage + target.status.hexed],
    ward: ([skill, source, target, damage]) => [skill, source, target, target.applyWard(damage)],
    protect: ([skill, source, target, damage]) => [skill, source, target, target.applyProtect(damage)],
    armor: ([skill, source, target, damage]) => [skill, source, target, Math.max(damage - target.status.armored, 0)]
};

const damageModifiersOrdered = ['hex', 'ward', 'protect', 'armor'];

export default class DamageSkill extends SkillBase {
    constructor(modifiedBy) {
        super('invisible');
        
        if (modifiedBy) {
            var modifiers = R.pipe(...damageModifiersOrdered.filter(key => modifiedBy[key]).map((key) => damageModifiers[key]));

            if (modifiers.length) {
                this.calculateDamage = function(skill, source, target, baseDamage) {
                    return modifiers([skill, source, target, baseDamage])[3];
                }
            }
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
