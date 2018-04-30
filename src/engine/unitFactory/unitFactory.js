import { cards as cardDatabase, runes as runeDatabase } from './../../data/gameData';
import { createSkills } from './skillFactory';
//import R from 'ramda';

export function createUnit(unitKey) {
  let card = getCard(unitKey);

  let unit = {
    unitKey,
    baseInfo: createBaseInfo(card),
    status: createStatus(card),
    passives: {}
  };

  let allSkills = createSkills(card.skill || []);

  unit.passives = allSkills.passives;
  unit.skills = allSkills.skills;

  applyRune(unit, unitKey.runeId);

  return unit;
}

function createStatus(card) {
  return {
    healthLeft: parseInt(card.health),
    timer: parseInt(card.cost),
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

function applyRune(unit, runeId) {
  var rune = runeDatabase[runeId];
  unit.rune = rune; // TODO
}

function getCard(unitKey) {
  var cardData = cardDatabase[unitKey.id];

  var card = Object.assign({}, cardData, { upgrades: undefined });

  if (unitKey.level > 1) {
    cardData.upgrades.slice(0, unitKey.level + 1).reduce((card, upgrade) => {
      if (upgrade.cost !== undefined) card.cost = upgrade.cost;
      if (upgrade.health !== undefined) card.health = upgrade.health;
      if (upgrade.attack !== undefined) card.attack = upgrade.attack;
      if (upgrade.desc !== undefined) card.desc = upgrade.desc;
      if (upgrade.skill.length > 0) card.skill = upgrade.skill;
    }, card);
  }
  return card;
}

function createBaseInfo(card) {
  return {
    name: card.name,
    rarity: parseInt(card.rarity),
    type: parseInt(card.card_type),
    faction: parseInt(card.type),
    subFactions: (card.sub_type || []).map(sf => parseInt(sf)),
    maxLevel: parseInt(card.maxLevel)
  }
}
