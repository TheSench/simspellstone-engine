/* eslint-disable */

import R from 'ramda';

export default {
    getFilters(skill) {
        let filters = [
            (unit) => unit.isAlive()
        ];
        if (skill.faction) filters.push((unit) => unit.isInFaction(skill.faction));
    },
    getTargetField(source, field) {
        return field[source.owner].units;
    },
    getTargets(skill, source, targetField, filters) {
        let targets = targetField.filter(R.allPass(filters));

        // Check All
        if (targets.length && !skill.all) {
            targets = choose_random_target(targets);
        }

        return targets;
    },
    getSkillValue(skill, source) {
        let value = skill.value;
        let enhanced = getEnhancement(source, skill.id);
        if (enhanced) {
            if (enhanced < 0) {
                enhanced = Math.ceil(value * -enhanced);
            }
            value += enhanced;
        }
    },
    performSkill(skill, source, field) {
        let filters = this.getFilters(skill),
            targetField = this.getTargetField(source, field);
        
        let targets = this.getTargets(skill, source, targetField, filters);

        let baseValue = this.getSkillValue(skill, source);

        let affected = 0;
        for (let target of targets) {
            if(this.affectTarget(skill, source, target, baseValue)) {
                affected++;
            }
        }
        return affected;
    },
    // eslint-disable-next-line no-unused-vars
    affectTarget(skill, source, target, baseValue) {
        return true;
    }
}