import Weaken from './weaken';

export default class WeakenSelf extends Weaken {
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
        return [source];
    }

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets.slice(0, 1);
    }
}
