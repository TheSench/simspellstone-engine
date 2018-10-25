import { theTurnSkill } from '../../skillTestCommon/skillTestBase.spec';
import { cooldown } from './../../skills';

describe('cooldown', () => {
  let skillOnCooldown = theTurnSkill(cooldown);

  describe('effects', () => {
    skillOnCooldown.shouldDoNothing();

    it('should lower its timer');

    it('should reset back to original skill if timer == 0');
  });
});
