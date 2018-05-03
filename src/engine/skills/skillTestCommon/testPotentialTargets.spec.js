import { expect } from 'chai';
import { createTestUnit } from './../../unitFactory/unitFactory';

export const testPotentialTargets = (function () {
  const field = {
    'player1': {
      commander: 1,
      units: [1.1, 1.2, 1.3, 1.4, 1.5]
    },
    'player2': {
      commander: 2,
      units: [2.1, 2.2, 2.3, 2.4, 2.5]
    }
  }


  function testFinalTargets(skill, allCount, singleCount) {
    it(`should return ${allCount} target(s) when all=true`, () => {
      let filteredTargets = Array(5).fill();

      let actualTargets = skill.getFinalTargets({ all: true }, filteredTargets);

      expect(actualTargets.length, "numTargets").to.equal(allCount);
    });

    it(`should return ${singleCount} target(s) when all=false`, () => {
      let filteredTargets = Array(5).fill();

      let actualTargets = skill.getFinalTargets({ all: false }, filteredTargets);

      expect(actualTargets.length, "numTargets").to.equal(singleCount);
    });
  }

  return {
    allOpposing(skill) {
      describe('potential targets', () => {
        it(`should target opposing units`, () => {
          let source = createTestUnit({ owner: 'player1', opponent: 'player2' });
          let expectedTargets = field.player2.units;

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 1);
      });
    },
    directlyOpposing(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target unit directly across from itself`, () => {
          source.position = 0;
          let expectedTargets = [field.player2.units[0]];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target nothing if there is no opposing unit`, () => {
          source.position = 5;
          let expectedTargets = [];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 1, 1);
      });
    },
    cone(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target unit directly across from itself, and the two units adjacent to it`, () => {
          source.position = 2;
          let expectedTargets = [2.2, 2.3, 2.4];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target nothing if there are no units in range`, () => {
          source.position = 6;
          let expectedTargets = [];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target left two units if it is the first unit in line`, () => {
          source.position = 0;
          let expectedTargets = [2.1, 2.2];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target unit one space to the left, even if no unit is directly across`, () => {
          source.position = 5;
          let expectedTargets = [2.5];

          let actualTargets = skill.getPotentialTargets(source, field);

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 5);
      });
    },
    allAllied(skill) {
      describe('potential targets', () => {
        it(`should target allied units`, () => {
          let source = createTestUnit({ owner: 'player1', opponent: 'player2' });
          let expectedTargets = field.player1.units;

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 1);
      });
    },
    adjacentAllied(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target units next to itself`, () => {
          source.position = 2;
          let expectedTargets = [1.2, 1.4];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target unit to its left if it is right-most unit`, () => {
          source.position = 4;
          let expectedTargets = [1.4];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        it(`should target the unit to its right if it is left-most unit`, () => {
          source.position = 0;
          let expectedTargets = [1.2];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 5, 5);
      });
    },
    self(skill) {
      describe('potential targets', () => {
        let source;

        beforeEach(() => {
          source = createTestUnit({ owner: 'player1', opponent: 'player2' });
        });

        it(`should target itself, regardless of the field`, () => {
          let expectedTargets = [source];

          let actualTargets = skill.getPotentialTargets(source, field)

          expect(actualTargets).to.deep.equal(expectedTargets);
        });

        testFinalTargets(skill, 1, 1);
      });
    }
  }
})();
