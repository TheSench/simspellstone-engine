import createDamageSkill from './damageSkill';

export default Object.assign(
  createDamageSkill(),
  {

    getPotentialTargets(source, field) {
      var start = Math.max(source.position - 1, 0);
      var end = source.position + 2;
      return field[source.opponent].units.slice(start, end);
    },

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets;
    }
  }
);
