import { skills as skillDatabase } from './../../data/gameData';

export function createSkills(cardSkills) {
  let allSkills = {
    skills: {
      activation: [],
      earlyActivation: [],
      turnStart: [],
      onAttack: [],
      onDamaged: [],
      turnEnd: [],
      onDeath: []
    },
    passives: {}
  };

  cardSkills.map((skill) => {
    var skillInfo = skillDatabase[skill.id];
    return skillAppliers[skillInfo.type](skill);
  }).forEach((skillApplier) => {
    skillApplier(allSkills);
  });

  return allSkills;
}

const skillAppliers = {
  activation: createActivationSkillApplier('activation'),
  earlyActivation: createActivationSkillApplier('earlyActivation'),
  onDeath: createActivationSkillApplier('onDeath'),
  turnStart: createTriggeredSkillApplier('turnStart'),
  onAttack: createTriggeredSkillApplier('onAttack'),
  onDamaged: createTriggeredSkillApplier('onDamaged'),
  turnEnd: createTriggeredSkillApplier('turnEnd'),
  passive: function addPassiveSkill(skill) {
    return function (allSkills) {
      allSkills.passives[skill.id] = skill.x;
    }
  }
};

function createActivationSkillApplier(skillSlot) {
  return function activationSkillApplier(skill) {
    return function applyActivationSkill(allSkills) {
      // TODO: Check skill info for which fields are applicable
      allSkills.skills[skillSlot].push({
        id: skill.id,
        value: skill.x,
        faction: (skill.y || 0),
        timer: (skill.c || 0),
        all: !!skill.y,
        skill: skill.s // TODO: Should this be renamed? It's the skill for enhance/imbue
      });
    }
  }
}

function createTriggeredSkillApplier(skillSlot) {
  return function TtiggeredSkillApplier(skill) {
    return function applyTriggeredSkill(allSkills) {
      // TODO: Check skill info for which fields are applicable
      allSkills.skills[skillSlot].push({
        id: skill.id,
        value: skill.x
      });
    }
  }
}