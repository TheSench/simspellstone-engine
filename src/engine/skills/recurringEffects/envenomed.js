export default class Envenomed {
  apply(poisoned, unit) {
    unit.takeDamage(unit.status.poisoned);
  }
}
