import Scorch from './scorch';

export default class ScorchSelf extends Scorch {    
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
        return [source];
    }
}
