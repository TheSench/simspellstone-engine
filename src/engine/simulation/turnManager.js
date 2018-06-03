export function processTurn(currentPlayer, matchInfo) {
  var currentField = matchInfo.fields[currentPlayer];

  exports.upkeep(currentField, matchInfo.fields);
  exports.startTurn(currentField, matchInfo.fields);
  exports.drawCard(currentPlayer);
  exports.playCard(currentPlayer, currentField);
  exports.activations(currentField, matchInfo.fields);
  exports.endTurn(currentField, matchInfo.fields);
}

export function upkeep(currentField, fields) {
  processField(currentField, unit => unit.onUpkeep(fields));
}

export function startTurn(currentField, fields) {
  processField(currentField, unit => unit.onStartTurn(fields));
}

export function drawCard(currentPlayer) {
  var topCard = currentPlayer.deck.slice(0, 1)[0];
  currentPlayer.deck = currentPlayer.deck.slice(1);
  if (topCard) {
    currentPlayer.hand.push(topCard);
  }
}

export function playCard(currentPlayer, currentField) {
  var card = currentPlayer.chooseCard();
  currentField.playCard(card);
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
