import SkillBase from './skillBase';

export default class Protect extends SkillBase{
    constructor() {
        super('nullified');
    }

    getFilters(skill) {
        let filters = super.getFilters(skill);
        //if (onlyOnDelay) filters.push((unit) => !unit.state.isActive);
        return filters;
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
