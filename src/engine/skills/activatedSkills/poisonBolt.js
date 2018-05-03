import Bolt from './bolt';

export default class PoisonBolt extends Bolt {
  // eslint-disable-next-line no-unused-vars
  doAffectTarget(skill, source, target, baseValue) {
      if(super.doAffectTarget(skill, source, target, baseValue) > 0) {
        target.applyPoison(baseValue);
      }
  }
}
