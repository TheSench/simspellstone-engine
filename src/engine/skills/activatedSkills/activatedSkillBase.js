import R from 'ramda';
import { random } from './../../../helpers/random';

function checkNegation(negatedBy) {
  return function (skill, source, target, baseValue) {
    if (target.status[negatedBy]) {
      target.status[negatedBy]--;
      return false;
    } else {
      this.doAffectTarget(skill, source, target, baseValue);
      return true;
    }
  };
}

const activatedSkillBase = {
  getFilters(skill) {
    let filters = [
      (unit) => unit.state.alive
    ];

    if (skill.faction) filters.push((unit) => unit.isInFaction(skill.faction));
    if (!skill.all) this.addSingleTargetFilters(skill, filters);

    return filters;
  },

  // eslint-disable-next-line no-unused-vars
  addSingleTargetFilters(skill, filters) {

  },

  getPotentialTargets(source, field) {
    return field[source.owner].units;
  },

  getFilteredTargets(skill, potentialTargets) {
    let filters = this.getFilters(skill);

    return potentialTargets.filter(R.allPass(filters));
  },

  getFinalTargets(skill, filteredTargets) {
    // Check All
    if (filteredTargets.length > 1 && !skill.all) {
      return [filteredTargets[random(filteredTargets.length)]];
    } else {
      return filteredTargets;
    }
  },

  getSkillValue(skill, source) {
    let value = skill.value;
    let enhanced = source.getEnhancement(skill.id);
    if (enhanced) {
      if (enhanced < 0) {
        enhanced = Math.ceil(value * -enhanced);
      }
      value += enhanced;
    }
  },

  performSkill(skill, source, field) {
    let potentialTargets = this.getPotentialTargets(source, field);

    let filteredTargets = this.getFilteredTargets(skill, potentialTargets);

    let targets = this.getFinalTargets(skill, filteredTargets);

    let baseValue = this.getSkillValue(skill, source);

    let affected = 0;
    for (let target of targets) {
      if (this.affectTarget(skill, source, target, baseValue)) {
        affected++;
      }
    }
    return affected;
  },

  // eslint-disable-next-line no-unused-vars
  doAffectTarget(skill, source, target, baseValue) {
    return true;
  }
};

export default function createActivatedSkill(negatedBy) {
  var activatedSkill = Object.create(activatedSkillBase);

  if (negatedBy) {
    activatedSkill.affectTarget = checkNegation(negatedBy);
  } else {
    activatedSkill.affectTarget = function (skill, source, target, baseValue) {
      activatedSkill.doAffectTarget(skill, source, target, baseValue);
      return true;
    };
  }

  return activatedSkill;
}
