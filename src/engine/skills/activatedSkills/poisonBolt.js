import { bolt } from './bolt';

export const poisonBolt = Object.assign(
  Object.create(bolt),
  {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      if (bolt.doAffectTarget(skill, source, target, baseValue) > 0) {
        target.applyPoison(baseValue);
      }
    }
  }
);
