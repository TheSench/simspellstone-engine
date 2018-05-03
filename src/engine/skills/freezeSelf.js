import Freeze from './freeze';

export default class FreezeSelf extends Freeze {
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
        return [source];
    }

    getFinalTargets(skill, filteredTargets) {
      return filteredTargets.slice(0, 1);
    }
}
