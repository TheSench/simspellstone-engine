const _stateBase = {
    alive: true,
    active: false,
    willAttack: false,
    willBeActive: false,

    activate() {
        return activeState;
    },
    activateNextTurn() {
        return activeNextTurnState;
    },
    die() {
        return deadState;
    },
    freeze() {
        return frozenState;
    },
    revive() {
        return this;
    },
    unFreeze() {
        return this;
    },
    weaken() {
        return this;
    }
};

const inactiveState = Object.assign(
    Object.create(_stateBase),
    {
        name: 'inactive'
    }
);

const activeNextTurnState = Object.assign(
    Object.create(_stateBase),
    inactiveState,
    {
        name: 'activeNextTurn',

        willBeActive: true,
        willAttack: true,

        freeze() {
            return frozenState;
        }
    }
);

const activeState = Object.assign(
    Object.create(_stateBase),
    activeNextTurnState,
    {
        name: 'active',

        active: true,

        weaken() {
            return weakenedState;
        }
    }
);

const weakenedState = Object.assign(
    Object.create(_stateBase),
    activeState,
    {
        name: 'weakened',

        willAttack: false,
        
        activate() {
            return this;
        },        
        activateNextTurn() {
            return this;
        }
    }
);

const frozenState = Object.assign(
    Object.create(_stateBase),
    {
        name: 'frozen',

        activate() {
            return this;
        },
        activateNextTurn() {
            return this;
        },
        unFreeze() {
            return activeState;
        },
        weaken() {
            return this;
        }
    }
);

const deadState = Object.assign(
    Object.create(_stateBase),
    {
        name: 'dead',

        alive: false,

        activate() {
            return this;
        },
        activateNextTurn() {
            return this;
        },
        die() {
            return this;
        },
        freeze() {
            return this;
        },
        revive() {
            return inactiveState;
        },
        unFreeze() {
            return this;
        },
        weaken() {
            return this;
        }
    }
);

export default {
    inactive: inactiveState,
    activeNextTurn: activeNextTurnState,
    active: activeState,
    frozen: frozenState,
    weakened: weakenedState,
    dead: deadState
};