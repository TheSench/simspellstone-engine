export default {
    apply(scorched, unit) {
      unit.takeDamage(unit.status.scorched);
      if (!--unit.status.scorchTimer) {
        unit.status.scorched = 0;
        unit.removeSkill("turnEnd", scorched);
      }
    }
  };
