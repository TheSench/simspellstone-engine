import { CommanderIsDead } from "../../../simulation/commanderIsDead";

export default {
  // eslint-disable-next-line no-unused-vars
  performSkill(skill, source, field, baseValue) {
    // Stop simulation as soon as commander dies, regardless of where it is
    // This is normally an anti-pattern, but allows me to avoid checking if commander is alive everywhere
    throw new CommanderIsDead(source);
  }
};
