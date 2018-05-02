import { expect } from 'chai';
import { createUnit } from './unitFactory';
import * as skillFactory from './skillFactory';
import states from './unitStates';

import * as gameData from './../../data/gameData';
import { cards as mockCards } from './../../mocks/mockGameData';
import { ids as rarities } from './../../constants/rarities';
import { ids as cardTypes } from './../../constants/cardTypes';
import { ids as factions } from './../../constants/factions';
import sinon from 'sinon';

var sandbox = sinon.createSandbox();

describe('unitFactory', () => {
  const allSkills = {
    skills: {
      activation: [],
      earlyActivation: [],
      onDeath: []
    },
    passives: {}
  };
  
  beforeEach(() => {
    sandbox.replace(gameData, 'cards', mockCards);
  });

  afterEach(function () {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  describe('createUnit - basic info', () => {
    const unitKey = { id: 1, level: 1, runeId: null };

    it('should return a unit object', () => {
      let unit = createUnit(unitKey);

      expect(unit).to.be.a('object');
    });

    describe('unit', () => {
      it('should have a status', () => {
        let unit = createUnit(unitKey);

        // TODO: Figure out why it complains that "object" is not an object (Object(unit) !== unit in assertion.js)
        //expect(unit).to.include('status');
        expect(unit.status).to.exist;
      });

      it('should have a unitKey property matching the passed in info', () => {
        let unit = createUnit(unitKey);

        expect(unit.unitKey).to.equal(unitKey);
      });

      it('should be initialized with the correct health/timer', () => {
        let unit = createUnit(unitKey);

        expect(unit.status.healthLeft).to.equal(10);
        expect(unit.status.timer).to.equal(5);
      });

      it('should have the correct base unit info', () => {
        let unit = createUnit(unitKey);

        expect(unit.baseInfo.name, "baseInfo.name").to.equal("Test Card One");
        expect(unit.baseInfo.rarity, "baseInfo.rarity").to.equal(rarities.Rare);
        expect(unit.baseInfo.type, "baseInfo.type").to.equal(cardTypes.Assault);
        expect(unit.baseInfo.faction, "baseInfo.faction").to.equal(factions.Aether);
        expect(unit.baseInfo.subFactions, "baseInfo.subFactions").to.deep.equal([factions.Mecha, factions.Insect]);
        expect(unit.baseInfo.maxLevel, "baseInfo.maxLevel").to.equal(1);
      });

      it('should be given skills from the skillFactory', () => {
        const mockSkillFactory = sandbox.mock(skillFactory);
        mockSkillFactory.expects("createSkills").once().returns(allSkills);

        let unit = createUnit(unitKey);

        expect(unit.skills, "unit.skills").to.equal(allSkills.skills);
        expect(unit.passives, "unit.passives").to.equal(allSkills.passives);
      });
    });

    describe('state changes', () => {
      let unit;

      beforeEach(() => {
        unit = createUnit(unitKey);
        unit.state = states.active;
      });

      it('should have a working activate method', () => {
        unit.activate();
        expect(unit.state).to.equal(states.active);
      });
      
      it('should have a working activateNextTurn method', () => {
        unit.activateNextTurn();
        expect(unit.state).to.equal(states.activeNextTurn);
      });
      
      it('should have a working die method', () => {
        unit.die();
        expect(unit.state).to.equal(states.dead);
      });
      
      it('should have a working freeze method', () => {
        unit.freeze();
        expect(unit.state).to.equal(states.frozen);
      });
      
      it('should have a working revive method', () => {
        unit.revive();
        expect(unit.state).to.equal(states.active);
      });
      
      it('should have a working unFreeze method', () => {
        unit.unFreeze();
        expect(unit.state).to.equal(states.active);
      });

      it('should have a working weaken method', () => {
        unit.weaken();
        expect(unit.state).to.equal(states.weakened);
      });
    });
  });
});
