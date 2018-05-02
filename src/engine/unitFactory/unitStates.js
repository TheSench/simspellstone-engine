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
    empower() {
        return this;
    },
    freeze() {
        return frozenState;
    },
    revive() {
        return this;
    },
    unfreeze() {
        return this;
    },
    weaken() {
        return this;
    }
};

function setStateBasedOnTimer(timer) {
    switch (timer) {
        case 0:
            return activeState;
        case 1:
            return activeNextTurnState;
        default:
            return inactiveState;
    }
}

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
        },
        empower: setStateBasedOnTimer,
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
        unfreeze: setStateBasedOnTimer,
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
        revive: setStateBasedOnTimer,
        unfreeze() {
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