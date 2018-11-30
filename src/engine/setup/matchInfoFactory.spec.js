//import sinon from 'sinon';
import chai from 'chai';
import assertArrays from 'chai-arrays';
import sinon from 'sinon';
import * as fieldFactory from './fieldFactory';
import * as matchInfoFactory from './matchInfoFactory';
import * as playerFactory from './playerFactory';
chai.use(assertArrays);
const expect = chai.expect;

describe('matchInfoFactory', () => {
  const sandbox = sinon.createSandbox(),
    playerHash = 'PlayerDeckHash',
    cpuHash = 'CpuDeckHash';

  var dummyPlayer,
    dummyCpu,
    dummyPlayerField,
    dummyCpuField;

  beforeEach(() => {
    dummyPlayer = { name: 'player' };
    dummyCpu = { name: 'cpu ' };
    dummyPlayerField = {};
    dummyCpuField = {};

    sandbox.stub(playerFactory, "createPlayer")
    .withArgs('player', playerHash).returns(dummyPlayer)
    .withArgs('cpu', cpuHash).returns(dummyCpu);

    sandbox.stub(fieldFactory, "createField")
      .withArgs(dummyPlayer).returns(dummyPlayerField)
      .withArgs(dummyCpu).returns(dummyCpuField);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('basic match creation', () => {

    it('should create two players', () => {
      var game = matchInfoFactory.createMatchInfo(playerHash, cpuHash);

      expect(game.player1).to.equal(dummyPlayer);
      expect(game.player2).to.equal(dummyCpu);
    });

    it('should set players as opponents of each other', () => {
      var game = matchInfoFactory.createMatchInfo(playerHash, cpuHash);

      expect(game.player1.opponent).to.equal(dummyCpu);
      expect(game.player2.opponent).to.equal(dummyPlayer);
    });

    it('should create two fields', () => {
      var game = matchInfoFactory.createMatchInfo(playerHash, cpuHash);

      expect(game.fields).to.exist;
      expect(game.fields).to.be.array();
      expect(game.fields).to.be.ofSize(2);
    });

    it('should create fields for a "player" and a "cpu"', () => {
      var game = matchInfoFactory.createMatchInfo(playerHash, cpuHash);

      var expectedField = [dummyPlayerField, dummyCpuField];
      expect(game.fields).to.deep.equal(expectedField);
    });
  });
});
