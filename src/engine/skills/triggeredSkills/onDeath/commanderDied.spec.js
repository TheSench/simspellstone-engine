import { expect } from 'chai';
import { commanderDied } from '../../skills';

describe('commanderDied', () => {
  it('should throw exception when invoked', () => {
    try {
      commanderDied.performSkill(null, 5);
    } catch(commanderIsDead) {
      expect(commanderIsDead.whichCommander).to.equal(5);
    }
  });
});
