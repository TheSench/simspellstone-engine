import DamageSkill from './damageSkill';

export default class Attack extends DamageSkill {
  constructor() {
    super({
      negatedBy: null,
      warded: false,
      armored: true
    });
  }

  getPotentialTargets(source, field) {
    var opponent = field[source.opponent];
    return opponent.units.slice(source.position, source.position + 1).concat(opponent.commander);
  }

  getFinalTargets(skill, filteredTargets) {
    return filteredTargets.slice(0, 1);
  }
  // eslint-disable-next-line no-unused-vars
  doAffectTarget(skill, source, target, baseValue) {
    if(super.doAffectTarget(skill, source, target, baseValue) > 0) {
      // source.OnDamageDealt skills
      // target.OnDamaged skills
    }
  }
}
