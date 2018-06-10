import weaken from './weaken';

export default Object.assign(
  Object.create(weaken),
  {
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
      return [source];
    },

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets.slice(0, 1);
    }
  }
);
