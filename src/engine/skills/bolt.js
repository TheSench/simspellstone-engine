import DamageSkill from './damageSkill';

export default class Bolt extends DamageSkill{
    constructor() {
        super({
            hex: true,
            ward: true,
            protect: true,
            armor: false
        });
    }
}
