import hex from './hex';

export default Object.assign(
  Object.create(hex),
  {
    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {
      target.status.hexed += baseValue;
    }
  }
);
