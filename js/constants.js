const INITAL_SNAKE_LENGTH = 5
const CAKE_VALUE = 50

const CANVAS_COLOUR = 'rgb(44, 40, 40)'
const SNAKE_COLOUR = 'rgb(33, 152, 151)'

const CONTEXT = CANVAS.getContext('2d')
const IMAGE_CAKE = new Image()
const IMAGE_SUPER_CAKE = new Image()
const IMAGE_SNAKE = new Image()
IMAGE_CAKE.src = "./assets/cake.png"
IMAGE_SUPER_CAKE.src = "./assets/supercake.png"
IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_up.png"
const SNAKE_HEAD_PATH = "./assets/snakeheads/snakehead_"
const IMAGE_CAKE_SIZE = 256
const IMAGE_SUPER_CAKE_SIZE = 512
const IMAGE_SNAKE_SIZE = 800

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
        2: hideHelp,
        3: hideHighscores,
    },
    27: { // esc
        0: restart,
        1: hideForm,
        2: hideHelp,
        3: hideHighscores
    },
    32: { // space
        0: function () { isGameOver ? restart() : togglePause(); },
        1: blockInput,
        2: blockInput,
        3: blockInput,
    },
    72: { // H
        0: showHelp,
        1: blockInput,
        2: hideHelp,
        3: blockInput
    },
    76: { // L
        0: showHighscores,
        1: blockInput,
        2: blockInput,
        3: hideHighscores
    },
    37: { // Arrow left
        0: function () { if (move(-1, 0)) setSnakeHeadImage('left'); },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    38: { // Arrow up
        0: function () { if (move(0, -1)) setSnakeHeadImage('up'); },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    39: { // Arrow right
        0: function () { if (move(1, 0)) setSnakeHeadImage('right'); },
        1: blockInput,
        2: blockInput,
        3: blockInput
    },
    40: { // Arrow down
        0: function () { if (move(0, 1)) setSnakeHeadImage('down'); },
        1: blockInput,
        2: blockInput,
        3: blockInput
    }
}