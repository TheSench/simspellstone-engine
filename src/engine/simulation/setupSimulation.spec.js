import { expect } from 'chai';
import sinon from 'sinon';
import * as matchInfoFactory from './../setup/matchInfoFactory';
import { setupSimulation } from './setupSimulation';

describe('setupSimulation', () => {
  var sandbox = sinon.createSandbox();
  var matchInfo;

  beforeEach(() => {
    matchInfo = {
      player1: {},
      player2: {}
    };
    matchInfo.player1.opponent = matchInfo.player2;
    matchInfo.player2.opponent = matchInfo.player1;
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('creating matchInfo', () => {
    let createMatchInfo,
    createMatchInfoResult;

    beforeEach(() => {
      createMatchInfoResult = {
        player1: {},
        player2: {},
        fields: []
      };
      createMatchInfo = sinon.fake.returns(createMatchInfoResult);
      sandbox.replace(matchInfoFactory, 'createMatchInfo', createMatchInfo);
    });

    it(`calls createMatchInfo for both players`, () => {
      var playerInfo = {hash: 'QpLQA'};
      var cpuInfo = {hash: 'A3FAA'};

      setupSimulation(playerInfo, cpuInfo);

      expect(createMatchInfo.calledWith(playerInfo.hash, cpuInfo.hash)).to.be.true;
    });

    it(`returns result of createMatchInfo`, () => {
      var playerInfo = {hash: 'QpLQA'};
      var cpuInfo = {hash: 'A3FAA'};

      var result = setupSimulation(playerInfo, cpuInfo);

      expect(result).to.equal(createMatchInfoResult);
    });
  });
});
