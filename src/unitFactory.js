export function createUnit(unitInfo) {
  let {id, level, runeId} = unitInfo;

  let unit = {
    id: id,
    level: level,
    status: createStatus()
  };

  applyRune(unit, runeId);

  return unit;
}

function createStatus() {
  return {
    // Attack Modifiers
    attackBerserk: 0,
    attackValor: 0,
    attackRally: 0,
    attackWeaken: 0,
    attackCorroded: 0,
    corrosionTimer: 0,
    // Mark
    markTarget: 0,
    // Other Statuses
    // Numeric-Statuses
    barrierIce: 0,
    corroded: 0,
    enfeebled: 0,
    enraged: 0,
    envenomed: 0,
    imbued: 0,
    invisible: 0,
    nullified: 0,
    poisoned: 0,
    protected: 0,
    scorched: 0,
    warded: 0,
    // Boolean-Status
    jammed: false,
    jammedSelf: false,
    silenced: false,
    valorTriggered: false,
    dualstrikeTriggered: false,
    onDeathTriggered: false,
    reanimated: false
  };
}

function applyRune(unit, runeId) {
  unit.rune = runeId; // TODO
}
