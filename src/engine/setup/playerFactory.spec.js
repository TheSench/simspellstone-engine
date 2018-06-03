import chai from 'chai';
import assertArrays from 'chai-arrays';
import sinon from 'sinon';
import * as deckFactory from './deckFactory';
import { createPlayer } from './playerFactory';
chai.use(assertArrays);
const expect = chai.expect;

describe('playerFactory', () => {
  describe('createPlayer', () => {
    describe('basic functionality', () => {
      it('should return a player object with hand array', () => {
        var player = createPlayer();

        expect(player.hand).to.be.array();
      });

      it('should return a player that has a deck object', () => {
        var player = createPlayer();

        expect(player.deck).to.exist;
      });
    });

    describe('deck creation', () => {
      var sandbox = sinon.createSandbox();
      var deck = {
        commander: {},
        units: [1,2,3]
      };

      beforeEach(() => {
        var createDeck = sandbox.stub(deckFactory, "createDeck");
        createDeck = deckFactory.createDeck;
        createDeck.returns(deck);
      });

      afterEach(() => {
        sandbox.restore();
      });

      it("should retrieve the player's deck from the deckFactory using the given hash", () => {
        var player = createPlayer();

        expect(player.deck).to.equal(deck.units);
      });
    });
  });
});
