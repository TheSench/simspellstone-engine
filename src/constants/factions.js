import { reverseEnum } from './enumHelpers';

export const ids = Object.freeze({
    Factionless: 0,
    Aether: 1,
    Chaos: 2,
    Wyld: 3,
    Frog: 4,
    Elemental: 5,
    Angel: 6,
    Undead: 7,
    Void: 8,
    Dragon: 9,
    Avian: 10,
    Goblin: 11,
    Seafolk: 12,
    Insect: 13,
    Bear: 14,
    Token: 15,
    Mecha: 16,
    Knight: 17,

    Tower: 999
});

export const names = Object.freeze(reverseEnum(ids));