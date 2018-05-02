import Scorch from './scorch';

export default class ScorchSelf extends Scorch {
    constructor() {
        super({negatedBy: null}), true;
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
    }
    
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
        return [source];
    }
}
