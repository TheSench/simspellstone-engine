import sinon from 'sinon';
import { expect } from 'chai';
import { TurnManager } from './turnManager';

describe('turnManager', () => {
  let turnManager;

  beforeEach(() => {
    turnManager = new TurnManager();
  });

  describe('Upkeep', () => {
    it('should clear statuses that end at beginning of turn');
  });

  describe('StartTurn', () => {
    it('should trigger startTurn skills');
  });

  describe('DrawCard', () => {
    it("should draw the top card from player's deck");
  });

  describe('PlayCard', () => {
    it("should play a card from player's hand");
  });

  describe('Activations', () => {
    it('should trigger earlyActivation skills');

    it('should trigger activation skills');
  });

  describe('EndTurn', () => {
    it('should clear statuses that end at end of turn');

    it("should apply recurring status effects such as DoT's");

    it('should remove dead units');

    it('should trigger endTurn skills');
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
    it('should start at turn 1', () => {
      expect(turnManager.turn, "turn").to.equal(1);
    });


    it('should increment the turn each time it runs', () => {
      turnManager.processTurn();
      expect(turnManager.turn, "turn").to.equal(2);

      turnManager.processTurn();
      expect(turnManager.turn, "turn").to.equal(3);
    });

    [1, 99, 100].forEach((turn) => {
      it('should return true if less than 100 turns have transpired', () => {
        turnManager.turn = turn;

        var result = turnManager.processTurn();
        expect(result).to.be.true;
      });
    });

    [101, 102].forEach((turn) => {
      it('should return false after turn 100', () => {
        turnManager.turn = turn;

        var result = turnManager.processTurn();
        expect(result).to.be.false;
      });
    });

    it('should do nothing after turn 100');
  });
});

function verifyCallOrder(spies) {
  for (var i = 0; i < spies.length - 1; i++) {
    expect(spies[i].calledImmediatelyBefore(spies[i + 1]), `step ${i} called before ${i + 1}`).to.be.true;
  }
  var lastSpy = spies.length - 1;
  expect(spies[lastSpy].calledImmediatelyAfter(spies[lastSpy - 1]), `step ${lastSpy} called after ${lastSpy - 1}`).to.be.true;
}
