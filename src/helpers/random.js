import seedrandom from 'seedrandom';

let rng = seedrandom();

export function seed(newseed) {
    rng = seedrandom(newseed);
}

export function random(maxExclusive) {
    return Math.floor(rng() * maxExclusive);
}