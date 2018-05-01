import { expect } from 'chai';
import * as skillFactory from './skillFactory';
import * as gameData from './../../data/gameData';
import { skills as mockSkills } from './../../mocks/mockGameData';
import R from 'ramda';
import sinon from 'sinon';

var sandbox = sinon.createSandbox();

describe('skillFactory', () => {
    beforeEach(() => {
      sandbox.replace(gameData, 'skills', mockSkills);
    });

    it('should return an object with "skills" and "passives"', () => {
        let createdSkills = skillFactory.createSkills([]);

        expect(createdSkills.passives, "passives").to.exist;
        expect(createdSkills.skills, "skills").to.exist;
        expect(createdSkills.skills.activation, "activation").to.exist;
        expect(createdSkills.skills.earlyActivation, "earlyActivation").to.exist;
        expect(createdSkills.skills.onDeath, "onDeath").to.exist;
    });

    it('should add activation skills to correct array', () => {
        let createdSkills = skillFactory.createSkills([
            {
                "id": "activationSkill",
                "x": 1
            }
        ]);

        assertSkillCounts(createdSkills, {
            activation: 1,
            earlyActivation: 0,
            onDeath: 0,
            passive: 0
        });

        let skill = createdSkills.skills.activation[0];
        expect(skill.id, "skill.id").to.equal('activationSkill');
        expect(skill.value, "skill.value").to.equal(1);
    });

    it('should add early-activation skills to correct array', () => {
        let createdSkills = skillFactory.createSkills([
            {
                "id": "earlyActivationSkill",
                "x": 1
            }
        ]);

        assertSkillCounts(createdSkills, {
            activation: 0,
            earlyActivation: 1,
            onDeath: 0,
            passive: 0
        });

        let skill = createdSkills.skills.earlyActivation[0];
        expect(skill.id, "skill.id").to.equal('earlyActivationSkill');
        expect(skill.value, "skill.value").to.equal(1);
    });

    it('should add on-death skills to correct array', () => {
        let createdSkills = skillFactory.createSkills([
            {
                "id": "onDeathSkill",
                "x": 1
            }
        ]);

        assertSkillCounts(createdSkills, {
            activation: 0,
            earlyActivation: 0,
            onDeath: 1,
            passive: 0
        });

        let skill = createdSkills.skills.onDeath[0];
        expect(skill.id, "skill.id").to.equal('onDeathSkill');
        expect(skill.value, "skill.value").to.equal(1);
    });

    it('should add passive skills to correct array', () => {
        let createdSkills = skillFactory.createSkills([
            {
                "id": "passiveSkill",
                "x": 1
            }
        ]);

        assertSkillCounts(createdSkills, {
            activation: 0,
            earlyActivation: 0,
            onDeath: 0,
            passive: 1
        });

        let value = createdSkills.passives['passiveSkill'];
        expect(value, "skill.x").to.equal(1);
    });

    afterEach(function () {
    });
});

function assertSkillCounts(allSkills, skillCounts) {
    expect(allSkills.skills.activation.length, "activation count").to.equal(skillCounts.activation);
    expect(allSkills.skills.earlyActivation.length, "earlyActivation count").to.equal(skillCounts.earlyActivation);
    expect(allSkills.skills.onDeath.length, "onDeath count").to.equal(skillCounts.onDeath);

    let passiveCount = R.pipe(R.toPairs,
        R.map(R.nth(1)),
        R.filter(R.compose(R.not, R.equals(0)))
    )(allSkills.passives);
    expect(passiveCount.length, "passive count").to.equal(skillCounts.passive);
}
