import DamageSkill from './damageSkill';

var skillBase = new DamageSkill({
  negatedBy: null,
  warded: false,
  armored: true
});

export const attack = Object.assign(
  Object.create(skillBase),
  {
    getPotentialTargets(source, field) {
      var opponent = field[source.opponent];
      return opponent.units.slice(source.position, source.position + 1).concat(opponent.commander);
    },

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets.slice(0, 1);
    },

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      if (skillBase.doAffectTarget(skill, source, target, baseValue) > 0) {
        // source.OnDamageDealt skills
        // target.OnDamaged skills
      }
    }
  }
);
