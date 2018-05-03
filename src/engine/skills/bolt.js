import DamageSkill from './damageSkill';

export default class Bolt extends DamageSkill {
  constructor() {
    super({
      hex: true,
      ward: true,
      protect: true,
      armor: false
    });
  }

  getFinalTargets(skill, filteredTargets) {
    return super.getFinalTargets(skill, filteredTargets);
  }
}
