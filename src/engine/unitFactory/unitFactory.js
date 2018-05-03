import { cards as cardDatabase, runes as runeDatabase } from './../../data/gameData';
import states from './unitStates';
import { createSkills } from './skillFactory';
//import R from 'ramda';

export function createUnit(unitKey) {
  let card = getCard(unitKey);
  return _createUnit(unitKey, card);
}

function _createUnit(unitKey, card) {
  let unit = Object.assign(
    Object.create(unitBase),
    {
      unitKey,
      baseInfo: createBaseInfo(card),
      state: states.inactive,
      stats: {
        attack: parseInt(card.attack),
        health: parseInt(card.health),
        delay: parseInt(card.cost)
      },
      passives: {},
      position: 0,
      owner: null,
      opponent: null
    }
  );

  unit.status = createStatus(unit.stats);

  let allSkills = createSkills(card.skill || []);

  Object.assign(unit.passives, defaultPassives, allSkills.passives);
  unit.skills = allSkills.skills;

  applyRune(unit, unitKey.runeId);

  return unit;
}

export function createTestUnit({ owner, opponent, state, status, passives } = {}) {
  let unit = Object.assign(
    _createUnit({}, { attack: 5, health: 10, cost: 5 }),
    {
      state: state || states.active,
      position: 0,
      owner: (owner || null),
      opponent: (opponent || null)
    }
  );

  if (passives) Object.assign(unit.passives, passives);
  if (status) Object.assign(unit.status, status);

  return unit;
}

export const defaultPassives = {
  armored: 0,
  pierce: 0
};

const unitBase = (function createUnitBase() {
  var unitBase = {
    takeDamage(damage) {
      if (damage > 0) {
        this.status.healthLeft -= damage;
        if (this.status.healthLeft <= 0) {
          this.state = this.state.die();
        }
      }
    },
    healDamage(healing) {
      if (healing > 0) {
        this.status.healthLeft += Math.min(healing, this.damageTaken());
      }
    },
    applyWard(damage) {
      let status = this.status;
      if (status.warded) {
        let warded = Math.min(damage, status.warded);
        status.warded -= warded;
        return (damage - warded);
      } else {
        return damage;
      }
    },
    applyProtect(damage) {
      let status = this.status;
      if (status.protection) {
        let protection = Math.min(damage, status.protection);
        status.protection -= protection;
        return (damage - protection);
      } else {
        return damage;
      }
    },
    applyPoison(poison) {
      if (poison > this.status.poisoned) {
        this.status.poisoned = poison;
      }
    },
    damageTaken() {
      return this.stats.health - this.status.healthLeft;
    },
    tickTimer() {
      this.status.timer--;
      switch (this.status.timer) {
        case 1:
          this.state = this.state.activateNextTurn();
          break;
        case 0:
          this.state = this.state.activate();
          break;
      }
    }
  };

  // Add state-change delegate methods to unit
  ['activate', 'activateNextTurn', 'die', 'empower', 'freeze', 'revive', 'unfreeze', 'weaken'].map((stateChange) => {
    unitBase[stateChange] = function () {
      this.state = this.state[stateChange](this.status.timer);
    }
  });

  return unitBase;
})();

export function createStatus(stats) {
  return {
    healthLeft: stats.health,
    timer: stats.delay,
    position: -1,
    // Attack Modifiers
    attackBerserk: 0,
    attackValor: 0,
    attackEmpower: 0,
    attackWeaken: 0,
    attackCorroded: 0,
    corrosionTimer: 0,
    // Mark
    markTarget: 0,
    // Other Statuses
    // Numeric-Statuses
    barrierIce: 0,
    corroded: 0,
    hexed: 0,
    enraged: 0,
    envenomed: 0,
    imbued: 0,
    invisible: 0,
    nullified: 0,
    poisoned: 0,
    protection: 0,
    scorched: 0,
    scorchTimer: 0,
    warded: 0,
    // Boolean-Status
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
