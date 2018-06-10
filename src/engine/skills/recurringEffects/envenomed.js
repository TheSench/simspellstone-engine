export const envenomedHex = {
  apply(envenomed, unit) {
    unit.status.hexed += unit.status.envenomed;
  }
};

export const envenomedPoison = {
  apply(envenomed, unit) {
    unit.takeDamage(unit.status.envenomed);
  }
};
