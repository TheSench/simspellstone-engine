import freeze from './freeze';

export default Object.assign(
  Object.create(freeze),
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
