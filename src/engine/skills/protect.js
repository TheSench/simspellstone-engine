/* eslint-disable */

import skillBase from './skillBase';

export default Object.create(skillBase, {
    getFilters(skill) {
        let filters = skillBase.getFilters(skill);
        if (onlyOnDelay) filters.push((unit) => !unit.isActive());
    },
    // eslint-disable-next-line no-unused-vars
    affectTarget(skill, source, target, baseValue) {
        // Check Nullify
        if (target.status.nullified) {
            target.status.nullified--;
            // TODO: Echo
            return false;
        }

        let protection = baseValue;
        if (!protection) {
            var mult = skill.mult;
            if (!target.isActive()) {
                mult += (skill.on_delay_mult || 0);
            }
            protection = Math.ceil(target.health * mult);
        }

        target.status.protected += protection;
        if (additional) {
            target[additional] = (target[additional] || 0) + protection;
        }
        return true;
    }
});