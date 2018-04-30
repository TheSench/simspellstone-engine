import cardDatabase from './data/cards';
import skillDatabase from './data/skills';
import R from 'ramda';

export function createUnit(unitInfo) {
  var card = getCard(unitInfo);

  let unit = {
    unitInfo,
    status: createStatus(card),
    passives: {},
    skills: {
      earlyActivation: [],
      activation: [],
      onDeath: []
    }
  };

  addSkills(unit, card);

  applyRune(unit, unitInfo.runeId);

  return unit;
}

function createStatus(card) {
  return {
    healthLeft: card.health,
    timer: card.cost,
    // Attack Modifiers
    attackBerserk: 0,
    attackValor: 0,
    attackRally: 0,
    attackWeaken: 0,
    attackCorroded: 0,
    corrosionTimer: 0,
    // Mark
    markTarget: 0,
    // Other Statuses
    // Numeric-Statuses
    barrierIce: 0,
    corroded: 0,
    enfeebled: 0,
    enraged: 0,
    envenomed: 0,
    imbued: 0,
    invisible: 0,
    nullified: 0,
    poisoned: 0,
    protected: 0,
    scorched: 0,
    warded: 0,
    // Boolean-Status
    jammed: false,
    jammedSelf: false,
    silenced: false,
    valorTriggered: false,
    dualstrikeTriggered: false,
    onDeathTriggered: false,
    reanimated: false
  };
}

function addSkills(unit, cardData) {
  cardData.skill.map((skill) => {
    var skillInfo = skillDatabase[skill.id];
    return createSkillApplier[skillInfo.type](skill);
  }).forEach((skillApplier) => {
    skillApplier(unit);
  });
}

var createSkillApplier = new Map([
  [createActivationSkill('activation')],
  [createActivationSkill('earlyActivation')],
  [createActivationSkill('onDeath')],
  ['passive', function addPassiveSkill(skill) {
    return function (unit) {
      unit.passives[skill.id] = skill.x;
    }
  }]
]);

function createActivationSkill(skillSlot) {
  return [skillSlot, function addActivationSkill(skill) {
    return function (unit) {
      // TODO: Check skill info for which fields are applicable
      unit.skills[skillSlot].add({
        value: skill.x,
        faction: (skill.y || 0),
        timer: (skill.c || 0),
        all: !!skill.y,
        skill: skill.s // TODO: Should this be renamed? It's the skill for enhance/imbue
      });
    }
  }]
}

function applyRune(unit, runeId) {
  unit.rune = runeId; // TODO
}

function getCard(unitInfo) {
  var cardData = cardDatabase[unitInfo.id];

  var card = Object.assign({}, cardData, { upgrades: undefined });

  if (unitInfo.level > 1) {
    cardData.upgrades.slice(0, unitInfo.level + 1).reduce((card, upgrade) => {
      if (upgrade.cost !== undefined) card.cost = upgrade.cost;
      if (upgrade.health !== undefined) card.health = upgrade.health;
      if (upgrade.attack !== undefined) card.attack = upgrade.attack;
      if (upgrade.desc !== undefined) card.desc = upgrade.desc;
      if (upgrade.skill.length > 0) card.skill = upgrade.skill;
    }, card);
  }
  return card;
}
