import { expect } from 'chai';
import sinon from 'sinon';
import { createPlayer } from '../setup/playerFactory';
import { runSimulation } from './simulation';
import * as turnManager from './turnManager';

describe('runSimulation', () => {
  var sandbox = sinon.createSandbox();
  var matchInfo;

  beforeEach(() => {
    matchInfo = {
      player1: createPlayer(),
      player2: createPlayer()
    };
    matchInfo.player1.opponent = matchInfo.player2;
    matchInfo.player2.opponent = matchInfo.player1;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('calling processTurn', () => {
    var processTurn;

    beforeEach(() => {
      processTurn = sandbox.stub(turnManager, 'processTurn');
    });

    [1, 100].forEach((maxTurns) => {
      it(`given maxTurns of ${maxTurns} should process ${maxTurns} turns`, () => {
        runSimulation({ matchInfo, maxTurns });

        expect(processTurn.callCount).to.equal(maxTurns);
      });
    });

    it(`alternates players`, () => {
      runSimulation({ matchInfo, maxTurns: 5 });

      expect(processTurn.getCall(0).args[0]).to.equal(matchInfo.player1);
      expect(processTurn.getCall(1).args[0]).to.equal(matchInfo.player2);
      expect(processTurn.getCall(2).args[0]).to.equal(matchInfo.player1);
      expect(processTurn.getCall(3).args[0]).to.equal(matchInfo.player2);
      expect(processTurn.getCall(4).args[0]).to.equal(matchInfo.player1);
    });
  });
});
