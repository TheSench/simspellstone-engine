export default class Corroded {
  apply(corroded, unit) {
    unit.status.attackWeaken += corroded.value;
    unit.status.corrodedTimer--;

    if (!unit.status.corrodedTimer) {
      unit.corroded = 0;
      //unit.skills.turnEnd.find
    }
  }
}
