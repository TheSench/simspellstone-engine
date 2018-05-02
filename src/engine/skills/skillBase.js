import { random } from './../../helpers/random';
import R from 'ramda';

function checkNegation(negatedBy, self) {
    return function (skill, source, target, baseValue) {
        if (target.status[negatedBy]) {
            target.status[negatedBy]--;
            // TODO: Echo
            return false;
        } else {
            self.doAffectTarget(skill, source, target, baseValue);
            return true;
        }
    }
}

export default class SkillBase {
    constructor(negatedBy) {
        if (negatedBy) {
            this.affectTarget = checkNegation(negatedBy, this);
        } else {
            this.affectTarget = function (skill, source, target, baseValue) {
                this.doAffectTarget(skill, source, target, baseValue);
                return true;
            }
        }
    }

    getFilters(skill) {
        let filters = [
            (unit) => unit.state.alive
        ];

        if (skill.faction) filters.push((unit) => unit.isInFaction(skill.faction));
        if (!skill.all) this.addSingleTargetFilters(skill, filters);

        return filters;
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {

    }

    getPotentialTargets(source, field) {
        return field[source.owner].units;
    }

    getTargets(skill, potentialTargets) {
        let filters = this.getFilters(skill);

        let targets = potentialTargets.filter(R.allPass(filters));

        // Check All
        if (targets.length > 1 && !skill.all) {
            return [targets[random(targets.length)]];
        } else {
            return targets;
        }
    }

    getSkillValue(skill, source) {
        let value = skill.value;
        let enhanced = source.getEnhancement(skill.id);
        if (enhanced) {
            if (enhanced < 0) {
                enhanced = Math.ceil(value * -enhanced);
            }
            value += enhanced;
        }
    }

    performSkill(skill, source, field) {
        let potentialTargets = this.getPotentialTargets(source, field);

        let targets = this.getTargets(skill, potentialTargets);

        let baseValue = this.getSkillValue(skill, source);

        let affected = 0;
        for (let target of targets) {
            if (this.affectTarget(skill, source, target, baseValue)) {
                affected++;
            }
        }
        return affected;
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
        return true;
    }
}