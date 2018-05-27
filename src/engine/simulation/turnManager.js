export function processTurn(currentPlayer, matchInfo) {
  var currentField = matchInfo.fields[currentPlayer];

  exports.upkeep(currentField, matchInfo.fields);
  exports.startTurn(currentField, matchInfo.fields);
  exports.drawCard();
  exports.playCard();
  exports.activations(currentField, matchInfo.fields);
  exports.endTurn(currentField, matchInfo.fields);
}

export function upkeep(currentField, fields) {
  processField(currentField, unit => unit.onUpkeep(fields));
}

export function startTurn(currentField, fields) {
  processField(currentField, unit => unit.onStartTurn(fields));
}

export function drawCard() {

}

export function playCard() {

}

export function activations(currentField, fields) {
  processField(currentField, unit => unit.doEarlyActivationSkills(fields));
  processField(currentField, unit => unit.doActivationSkills(fields));
}

export function endTurn(currentField, fields) {
  processField(currentField, unit => unit.onEndTurn(fields));
}

function processField(field, processor) {
  processor(field.commander);
  field.units.forEach(processor);
}
