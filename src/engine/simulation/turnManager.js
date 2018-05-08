export class TurnManager {
  constructor() {
    this.turn = 1;
  }

  processTurn() {
    if(this.turn > 100) {
      return false;
    }

    this.upkeep();
    this.startTurn();
    this.drawCard();
    this.playCard();
    this.activations();
    this.endTurn();

    this.turn++;

    return true;
  }

  upkeep() {

  }

  startTurn() {

  }

  drawCard() {

  }

  playCard() {

  }

  activations() {

  }

  endTurn() {

  }
}
