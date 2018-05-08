export default class Poisoned {
  apply(poisoned, unit) {
    unit.takeDamage(poisoned.value);
  }
}
