import TurnSkillBase from "./../turnSkillBase";

export default class Valor extends TurnSkillBase {
  // eslint-disable-next-line no-unused-vars
  doPerformSkill(skill, source, field, baseValue) {
    //if (!source.status.valorTriggered) {
      if(this.checkOpponent(source, field)) {
        source.status.attackValor = baseValue;
      }
      skill.id = 'valorTriggered';
    //}
  }

  // eslint-disable-next-line no-unused-vars
  checkOpponent(source, field) {
    return true;

    // TODO: Where to put this logic
    /*
    let opponent = field.slice(source.position, 1);
    // TODO: Check adjusted attack
    if(opponent.state.alive && opponent.status.attack > source.attack) {
      return true;
    } else {
      return false;
>>>>>>> 361cb891369de38f32edd7d354bea9ea71e1e065
    }
    */
  }
}
