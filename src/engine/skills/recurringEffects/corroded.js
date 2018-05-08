export default class Corroded {
  apply(corroded, unit) {
    unit.status.attackWeaken += unit.status.corroded;
    if (!--unit.status.corrosionTimer) {
      unit.status.corroded = 0;
      unit.removeSkill("turnEnd", corroded);
    }
  }
}
