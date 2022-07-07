const INITAL_SNAKE_LENGTH = 5
const CAKE_VALUE = 50

const CANVAS_COLOUR = 'rgb(44, 40, 40)'
const SNAKE_COLOUR = 'rgb(33, 152, 151)'
const CAKE_COLOUR = 'rgb(255, 217, 92)'
const SUPERCAKE_COLOUR = 'rgb(250, 97, 227)'

const CONTEXT = CANVAS.getContext('2d')

const modalMap = [
    'none',
    'form',
    'help',
    'highscores'
]

// controls
const ALLOWED_KEYS = [13, 27, 32, 37, 38, 39, 40, 72, 76];

const KEY_MAPS = {
    13: { // enter
        0: blockInput,
        1: sendName,
        2: toggleHelp.bind(this, false),
        3: toggleHighscores.bind(this, false)
    },
    27: { // esc
        0: restart,
        1: toggleForm.bind(this, false),
        2: toggleHelp.bind(this, false),
        3: toggleHighscores.bind(this, false)
    },
    32: { // space
        0: function () { isGameOver ? restart() : togglePause(); },
        1: blockInput,
        2: blockInput,
        3: blockInput,
    },
    72: { // H
        0: toggleHelp.bind(this, true),
        1: blockInput,
        2: toggleHelp.bind(this, false),
        3: blockInput
    },
    76: { // L
        0: toggleHighscores.bind(this, true),
        1: blockInput,
        2: blockInput,
        3: toggleHighscores.bind(this, false)
    },
    37: { // Arrow left
        0: function () { move(-1, 0) },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    38: { // Arrow up
        0: function () { move(0, -1) },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    39: { // Arrow right
        0: function () { move(1, 0) },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    40: { // Arrow down
        0: function () { move(0, 1) },
        1: blockInput,
        2: blockInput,
        3: blockInput
    }
}