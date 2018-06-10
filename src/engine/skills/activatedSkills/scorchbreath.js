import scorch from './scorch';

export default Object.assign(
  Object.create(scorch),
  {
    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    },

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
