import { expect } from 'chai';
import sinon from 'sinon';
import { runSimulation } from './simulation';
import * as turnManager from './turnManager';

describe('runSimulation', () => {
  var sandbox = sinon.createSandbox();

  describe('maxTurns', () => {
    var processTurn;

    beforeEach(() => {
      processTurn = sandbox.stub(turnManager, 'processTurn');
    });

    afterEach(() => {
      sandbox.restore();
    });

    [1, 100].forEach((maxTurns) => {
      it(`given maxTurns of ${maxTurns} should process ${maxTurns} turns`, () => {
        runSimulation(maxTurns);

        expect(processTurn.callCount).to.equal(maxTurns);
      });
    });
  });
});
