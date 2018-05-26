import sinon from 'sinon';
import { verifyCallCounts, verifyCallOrder } from './spyHelpers.spec';
import * as turnManager from './turnManager';

describe('turnManager', () => {
  describe('upkeep', () => {
    it('should clear statuses that end at beginning of turn');
  });

  describe('startTurn', () => {
    it('should trigger startTurn skills');
  });

  describe('drawCard', () => {
    it("should draw the top card from player's deck");
  });

  describe('playCard', () => {
    it("should play a card from player's hand");
  });

  describe('activations', () => {
    it('should trigger earlyActivation skills');

    it('should trigger activation skills');
  });

  describe('endTurn', () => {
    it('should clear statuses that end at end of turn');

    it("should apply recurring status effects such as DoT's");

    it('should remove dead units');

    it('should trigger endTurn skills');
  });

  describe('process Turn', () => {
    var turnPhases;
    var sandbox;

    beforeEach(() => {
      sandbox = sinon.createSandbox();

      turnPhases = [
        sandbox.stub(turnManager, "upkeep"),
        sandbox.stub(turnManager, "startTurn"),
        sandbox.stub(turnManager, "drawCard"),
        sandbox.stub(turnManager, "playCard"),
        sandbox.stub(turnManager, "activations"),
        sandbox.stub(turnManager, "endTurn")
      ];
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should call the turn phases in the correct order', () => {
      turnManager.processTurn();

      verifyCallOrder(turnPhases);
      verifyCallCounts(1, turnPhases);
    });
  });
});
