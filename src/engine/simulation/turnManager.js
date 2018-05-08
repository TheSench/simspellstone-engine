export class TurnManager {
  constructor() {
    this.turn = 1;
  }

  processTurn() {
    this.upkeep();
    this.startTurn();
    this.drawCard();
    this.playCard();
    this.activations();
    this.endTurn();

    this.turn++;
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
