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
  var sandbox = sinon.createSandbox();
  const playerHash = 'PlayerDeckHash',
        cpuHash = 'CpuDeckHash',
        dummyPlayer = { name: 'player' },
        dummyCpu = { name: 'cpu '},
        dummyPlayerField = {},
        dummyCpuField = {};

  beforeEach(() => {
    var createPlayer = sandbox.stub(playerFactory, "createPlayer");
    var createField = sandbox.stub(fieldFactory, "createField");
    createPlayer.withArgs('player', playerHash).returns(dummyPlayer);
    createPlayer.withArgs('cpu', cpuHash).returns(dummyCpu);
    createField.withArgs(dummyPlayer).returns(dummyPlayerField);
    createField.withArgs(dummyCpu).returns(dummyCpuField);
  });

  afterEach(() => {
    sandbox.restore();
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
