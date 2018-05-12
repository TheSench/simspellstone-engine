import Hex from './hex';

export default class Mark extends Hex {
  // eslint-disable-next-line no-unused-vars
  doAffectTarget(skill, source, target, baseValue) {
    target.status.hexed += baseValue;
  }
}
