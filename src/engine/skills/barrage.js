import DamageSkill from './damageSkill';

export default class Barrage extends DamageSkill {
  constructor() {
    super({
      hex: false,
      ward: true,
      protect: true,
      armor: false
    });
  }

  getFinalTargets(skill, filteredTargets) {
    return super.getFinalTargets(skill, filteredTargets);
  }

  // eslint-disable-next-line no-unused-vars
  getSkillValue(skill, source) {
    // Barrage always deals 1 damage
    return 1;
  }

  performSkill(skill, source, field) {
    // The "value" of Barrage is how many times it fires
    var iterations = super.getSkillValue(skill, source);

    // TODO: Optimize this so we get targets once, and then just trim dead units
    let affected = 0;
    for (let i = iterations; i > 0; i--) {
      affected += super.performSkill(skill, source, field);
    }
    return affected;
  }
}
