export default {
  apply(poisoned, unit) {
    unit.takeDamage(unit.status.poisoned);
  }
};
