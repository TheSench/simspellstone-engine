import SkillBase from './skillBase';

export default class Protect extends SkillBase{
    constructor() {
        super('nullified');
    }

    // eslint-disable-next-line no-unused-vars
    addSingleTargetFilters(skill, filters) {
        //if (onlyOnDelay) filters.push((unit) => !unit.state.isActive);
    }

    // eslint-disable-next-line no-unused-vars
    doAffectTarget(skill, source, target, baseValue) {

        let protection = baseValue;
        if (!protection) {
            var mult = skill.mult;
            if (!target.state.isActive) {
                mult += (skill.on_delay_mult || 0);
            }
            protection = Math.ceil(target.health * mult);
        }

        target.status.protected += protection;
        
        return true;
    }
}
