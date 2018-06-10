import scorch from './scorch';

export default Object.assign(
  Object.create(scorch),
  {
    // eslint-disable-next-line no-unused-vars
    getPotentialTargets(source, field) {
      return [source];
    }
  }
);
