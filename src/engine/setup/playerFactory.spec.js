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
      it('should return a player object with empty hand array', () => {
        var player = createPlayer();

        expect(player.hand).to.be.array();
        expect(player.hand).to.be.empty;
      });

      it('should return a player object with empty drawPile array', () => {
        var player = createPlayer();

        expect(player.drawPile).to.be.array();
        expect(player.drawPile).to.be.empty;
      });

      it('should return a player that has a deck object', () => {
        var player = createPlayer();

        expect(player.deck).to.exist;
      });

      it('should return a player with the specified name', () => {
        let name = "A name";

        let player = createPlayer(name);

        expect(player.name).to.equal(name);
      });
    });

    describe('deck creation', () => {
      var sandbox = sinon.createSandbox();
      var deckHash = "ADeckHash";
      var deck = {
        commander: {},
        units: [1,2,3]
      };

      beforeEach(() => {
        var createDeck = sandbox.stub(deckFactory, "createDeck");
        createDeck.alwaysCalledWithExactly(deckHash);
        createDeck.returns(deck);
      });

      afterEach(() => {
        sandbox.restore();
      });

      it("should retrieve the player's deck from the deckFactory using the given hash", () => {
        var player = createPlayer(null, deckHash);

        expect(player.deck).to.equal(deck.units);
      });
    });
  });
});
