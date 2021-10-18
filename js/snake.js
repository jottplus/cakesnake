/* GLOBALS */
// tile sizing
let tileCountY = 0
let tileSize = 0

// game
let highscores = []
let score = 0
let isGameOver = false
let isGameStarted = false
let isGamePaused = false
let modalState = 0
let interval = false

// snake
let snake = []
let snakeLength = 0

// snake position
let snakeHeadX = 0
let snakeHeadY = 0

// direction flags
let xValue = 0
let yValue = 0

// cake
let cakeX = 0
let cakeY = 0

// super cake
let isSuperCake = false
let superCakeX = 0
let superCakeY = 0

/* INIT */
function initGame() {
    isGameStarted = false
    isGameOver = false
    isGamePaused = true
    isSuperCake = false

    updateScore(0) // reset score
    xValue = yValue = 0

    snake = []
    snakeLength = INITAL_SNAKE_LENGTH

    // randomly place snake
    snakeHeadX = Math.floor(Math.random() * TILE_COUNT_X)
    snakeHeadY = Math.floor(Math.random() * tileCountY)

    // place inital cake - dont hit snake
    do {
        cakeX = Math.floor(Math.random() * TILE_COUNT_X)
        cakeY = Math.floor(Math.random() * tileCountY)
    } while (snakeHeadX !== cakeX && snakeHeadY !== cakeY)

    superCakeX = superCakeY = 0 // init super cake position    

    togglePause()
}

/* GAMEPLAY */
// (un)pause game
function togglePause() {
    if (isGamePaused) interval = setInterval(game, 1000 / 15);
    else clearInterval(interval);
    isGamePaused = !isGamePaused
}

// game procedure
function game() {
    moveSnake()
    drawBackground()
    updateSnake()
    checkHits()
    drawCakes()
}

// update snake position
function moveSnake() {
    // update snake head position
    snakeHeadX += xValue;
    snakeHeadY += yValue;

    // no borders!
    if (snakeHeadX < 0) snakeHeadX = TILE_COUNT_X - 1;
    if (snakeHeadX > TILE_COUNT_X - 1) snakeHeadX = 0;
    if (snakeHeadY < 0) snakeHeadY = tileCountY - 1;
    if (snakeHeadY > tileCountY - 1) snakeHeadY = 0;
}

// update whole snake 
function updateSnake() {
    // draw snake
    CONTEXT.fillStyle = SNAKE_COLOUR;
    let ix = 0;
    for (var i = 0; i < snake.length; i++) {

        if (ix === snake.length - 1) drawImage(IMAGE_SNAKE, IMAGE_SNAKE_SIZE, snake[i].x, snake[i].y) // draw head of snake
        else CONTEXT.fillRect(snake[i].x * tileSize, snake[i].y * tileSize, tileSize - 2, tileSize - 2);

        // check snake hit
        if (snake[i].x == snakeHeadX && snake[i].y == snakeHeadY && isGameStarted) gameOver();
        ix++
    }

    // push new position to snake and remove oldest
    snake.push({ x: snakeHeadX, y: snakeHeadY });
    while (snake.length > snakeLength) snake.shift();
}

// check if cakes are found
function checkHits() {
    if (superCakeX == snakeHeadX && superCakeY == snakeHeadY) // super cake hit
        handleSuperCakeHit();

    if (cakeX == snakeHeadX && cakeY == snakeHeadY) // cake hit
        handleCakeHit();
}

// eat cake
function handleCakeHit() {
    snakeLength++
    updateScore(1)

    // new cake position    
    const newCakePos = calculateCakePos()
    cakeX = newCakePos.x
    cakeY = newCakePos.y

    if (Math.random() >= 0.9 && !isSuperCake) { // add super cake (10% chance)
        isSuperCake = true
        const newSuperCakePos = calculateCakePos()
        superCakeX = newSuperCakePos.x
        superCakeY = newSuperCakePos.y
    }
}

function calculateCakePos() {
    do {
        x = Math.floor(Math.random() * TILE_COUNT_X)
        y = Math.floor(Math.random() * tileCountY)
    } while (snake.find((s) => s.x === x && s.y === y)) // check if cake or snake position
    return { x: x, y: y }
}

// eat super cake
function handleSuperCakeHit() {
    snakeLength + 3;
    updateScore(3)
    isSuperCake = false
}

function move(x, y) {
    let changed = false;
    if (!isGamePaused) {
        if (xValue * (-1) !== x) {
            xValue = x
            changed = true
        }
        if (yValue * (-1) !== y) {
            yValue = y
            changed = true
        }
    }
    return changed
}

/* VIEW */
// colour whole background before adding items
function drawBackground() {
    CONTEXT.fillStyle = CANVAS_COLOUR;
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function drawCakes() {
    drawImage(IMAGE_CAKE, IMAGE_CAKE_SIZE, cakeX, cakeY)
    if (isSuperCake) drawImage(IMAGE_SUPER_CAKE, IMAGE_SUPER_CAKE_SIZE, superCakeX, superCakeY) // draw super cake
}

function drawImage(image, size, x, y) {
    CONTEXT.drawImage(image, 0, 0, size, size, x * tileSize, y * tileSize, tileSize, tileSize)
}

/* ENGINE */
function restart() {
    clearInterval(interval);
    initGame();
}

function gameOver() {
    clearInterval(interval)
    isGameOver = true
    getHighscores(function () {
        let min = Number.POSITIVE_INFINITY;
        let tmp = null
        for (let score of highscores) {
            tmp = score.score
            if (tmp < min) min = tmp
        }
        if (highscores.length < 10) showForm()
        else if (score > min) showForm()
        else showHighscores()
    })
}

function setSnakeHeadImage(direction) {
    IMAGE_SNAKE.src = SNAKE_HEAD_PATH + direction + ".png"
}

function updateScore(multiply) {
    if (multiply === 0) score = 0
    else score += CAKE_VALUE * multiply
    document.getElementById('scoreboard').innerHTML = score;
}