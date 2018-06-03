import sinon from 'sinon';
import { createPlayer } from '../setup/playerFactory';
import { verifyCallCounts, verifyCallOrder } from './spyHelpers.spec';
import * as turnManager from './turnManager';

describe('turnManager', () => {
  var matchInfo;

  beforeEach(() => {
    matchInfo = {
      player1: createPlayer(),
      fields: {
      }
    };
  });

  describe('upkeep', () => {
    it('should clear statuses that end at beginning of turn');

    it('should trigger onUpkeep skills on commander and all units', () => {
      var currentFeild = mockField('onUpkeep');

      turnManager.upkeep(currentFeild, matchInfo.fields);

      currentFeild.verifyCallCounts(1);
    });
  });

  describe('startTurn', () => {
    it('should trigger startTurn skills on commander and all units', () => {
      var currentFeild = mockField('onStartTurn');

      turnManager.startTurn(currentFeild, matchInfo.fields);

      currentFeild.verifyCallCounts(1);
    });
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

    it('should trigger endTurn skills on commander and all units', () => {
      var currentFeild = mockField('onEndTurn');

      turnManager.endTurn(currentFeild, matchInfo.fields);

      currentFeild.verifyCallCounts(1);
    });
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
      turnManager.processTurn(matchInfo.player1, matchInfo);

      verifyCallOrder(turnPhases);
      verifyCallCounts(1, turnPhases);
    });
  });
});

function mockField(methodName) {
  return {
    commander: {
      [methodName]: sinon.spy()
    },
    units: [
      { [methodName]: sinon.spy() },
      { [methodName]: sinon.spy() }
    ],
    verifyCallCounts(count) {
      var spies = [this.commander[methodName], ...this.units.map(unit => unit[methodName])];
      verifyCallCounts(count, spies);
    }
  };
}
