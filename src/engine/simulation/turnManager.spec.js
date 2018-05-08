import sinon from 'sinon';
import { expect } from 'chai';
import { TurnManager } from './turnManager';

describe('turnManager', () => {
  let turnManager;

  beforeEach(() => {
    turnManager = new TurnManager();
  });

  describe('Upkeep', () => {

  });

  describe('StartTurn', () => {

  });

  describe('DrawCard', () => {

  });

  describe('PlayCard', () => {

  });

  describe('Activations', () => {

  });

  describe('EndTurn', () => {

  });

  describe('Process Turn', () => {
    it('should call the turn phases in the correct order', () => {
      sinon.spy(turnManager, "upkeep");
      sinon.spy(turnManager, "startTurn");
      sinon.spy(turnManager, "drawCard");
      sinon.spy(turnManager, "playCard");
      sinon.spy(turnManager, "activations");
      sinon.spy(turnManager, "endTurn");

      turnManager.processTurn();

      verifyCallOrder([
        turnManager.upkeep,
        turnManager.startTurn,
        turnManager.drawCard,
        turnManager.playCard,
        turnManager.activations,
        turnManager.endTurn
      ]);
    });

    it('should increment the turn each time it runs', () => {
      expect(turnManager.turn, "turn").to.equal(1);

      turnManager.processTurn();
      expect(turnManager.turn, "turn").to.equal(2);

      turnManager.processTurn();
      expect(turnManager.turn, "turn").to.equal(3);
    });

    it('should return false if less than 100 turns have transpired');

    it('should return false after turn 100');
  });
});

function verifyCallOrder(spies) {
  for (var i = 0; i < spies.length - 1; i++) {
    expect(spies[i].calledImmediatelyBefore(spies[i + 1]), `step ${i} called before ${i + 1}`).to.be.true;
  }
  var lastSpy = spies.length - 1;
  expect(spies[lastSpy].calledImmediatelyAfter(spies[lastSpy - 1]), `step ${lastSpy} called after ${lastSpy - 1}`).to.be.true;
}
