export class EnvenomedHex {
  apply(envenomed, unit) {
    unit.status.hexed += unit.status.envenomed;
  }
}

export class EnvenomedPoison {
  apply(envenomed, unit) {
    unit.takeDamage(unit.status.envenomed);
  }
}