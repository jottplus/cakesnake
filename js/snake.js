/* CONSTANTS */
const INITAL_SNAKE_LENGTH = 5
const CAKE_VALUE = 50

const CANVAS_COLOUR = 'white'
const SNAKE_COLOUR = 'rgb(140, 191, 178)'
//const CAKE_COLOUR = 'rgb(204, 153, 195)'

const CONTEXT = CANVAS.getContext('2d')
const IMAGE_CAKE = new Image()
const IMAGE_SUPER_CAKE = new Image()
const IMAGE_SNAKE = new Image()
IMAGE_CAKE.src = "./assets/cake.png"
IMAGE_SUPER_CAKE.src = "./assets/supercake.png" 
IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_up.png"
const IMAGE_CAKE_SIZE = 256
const IMAGE_SUPER_CAKE_SIZE = 512
const IMAGE_SNAKE_SIZE = 800

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
let isModal = false
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

document.addEventListener('keydown', handleControls);

/* INIT */
function initGame() 
{ 
    isGameStarted = false
    isGameOver = false
    isGamePaused = true    

    updateScore(0) // reset score
    xValue = yValue = 0

    snake = []
    snakeLength = INITAL_SNAKE_LENGTH            

    // randomly place snake
    snakeHeadX = Math.floor(Math.random()*TILE_COUNT_X)
    snakeHeadY = Math.floor(Math.random()*tileCountY)   

    // place inital cake - dont hit snake
    do {
        cakeX = Math.floor(Math.random()*TILE_COUNT_X)
        cakeY = Math.floor(Math.random()*tileCountY)
    } while (snakeHeadX !== cakeX && snakeHeadY !== cakeY)  

    superCakeX = superCakeY = 0 // init super cake position    
    
    togglePause()
}

/* GAMEPLAY */
// (un)pause game
function togglePause() 
{
    if (isGamePaused) interval = setInterval(game, 1000/15);
    else clearInterval(interval);
    isGamePaused = !isGamePaused    
}

// game procedure
function game() 
{
    moveSnake()
    drawBackground()
    updateSnake()
    checkHits()
    drawCakes()     
}

// update snake position
function moveSnake() 
{
    // update snake head position
    snakeHeadX += xValue;
    snakeHeadY += yValue;  

    // no borders!
    if (snakeHeadX < 0) snakeHeadX = TILE_COUNT_X-1;
    if (snakeHeadX > TILE_COUNT_X-1) snakeHeadX = 0;
    if (snakeHeadY < 0) snakeHeadY = tileCountY-1;
    if (snakeHeadY > tileCountY-1) snakeHeadY = 0;
}

// update whole snake 
function updateSnake()
{
    // draw snake
    CONTEXT.fillStyle = SNAKE_COLOUR;
    let ix = 0;         
    for (var i = 0; i < snake.length; i++) {

        if (ix === snake.length-1) drawImage(IMAGE_SNAKE, IMAGE_SNAKE_SIZE, snake[i].x, snake[i].y) // draw head of snake
        else CONTEXT.fillRect(snake[i].x*tileSize, snake[i].y*tileSize, tileSize-2, tileSize-2);
        
        // check snake hit
        if (snake[i].x == snakeHeadX && snake[i].y == snakeHeadY && isGameStarted) gameOver();
        ix++            
    }

    // push new position to snake and remove oldest
    snake.push({x: snakeHeadX, y: snakeHeadY});
    while (snake.length > snakeLength) snake.shift();    
}

// check if cakes are found
function checkHits()
{
    if (superCakeX == snakeHeadX && superCakeY == snakeHeadY) // super cake hit
        handleSuperCakeHit(); 

    if (cakeX == snakeHeadX && cakeY == snakeHeadY) // cake hit
        handleCakeHit(); 
}

// eat cake
function handleCakeHit()
{    
    snakeLength++;
    updateScore(1)

    // new cake position
    cakeX = Math.floor(Math.random()*TILE_COUNT_X);
    cakeY = Math.floor(Math.random()*tileCountY);
    
    if (Math.random() >= 0.9) { // add super cake (10% chance)
        isSuperCake = true
        // TODO: check if cake or snake position
        superCakeX = Math.floor(Math.random()*TILE_COUNT_X);
        superCakeY = Math.floor(Math.random()*tileCountY);
    }       
}

// eat super cake
function handleSuperCakeHit()
{
    snakeLength+3;
    updateScore(3)
    isSuperCake = false
}

function move(x, y)
{
    if (!isGamePaused) {
        if (xValue*(-1) !== x) xValue = x
        if (yValue*(-1) !== y) yValue = y                
    }
}

/* VIEW */
// colour whole background before adding items
function drawBackground() 
{    
    CONTEXT.fillStyle = CANVAS_COLOUR;
    CONTEXT.fillRect(0, 0, CANVAS.width, CANVAS.height);
}

function drawCakes()
{
    drawImage(IMAGE_CAKE, IMAGE_CAKE_SIZE, cakeX, cakeY)
    if (isSuperCake) drawImage(IMAGE_SUPER_CAKE, IMAGE_SUPER_CAKE_SIZE, superCakeX, superCakeY) // draw super cake
}

function drawImage(image, size, x, y)
{
    CONTEXT.drawImage(image, 0, 0, size, size, x*tileSize, y*tileSize, tileSize, tileSize)
}

/* ENGINE */
function restart() 
{
    clearInterval(interval);
    initGame();
}

function gameOver() 
{
    clearInterval(interval)  
    isGameOver = true
    getHighscores(function(){
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

function handleControls(evt) 
{
    // first arrow keys starts game
    if (!isGameStarted && [37,38,39,40].includes(evt.keyCode)) isGameStarted = true

    switch(evt.keyCode) {
        case 13: handleEnterKey(); break
        case 27: handleEscKey(); break
        case 32: handleSpaceKey(); break
        case 37: // left key
            if (!isModal) {
                move(-1, 0)
                IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_left.png" 
            }             
            break
        case 38: // up key
            if (!isModal) {
                move(0, -1)
                IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_up.png" 
            }
            break
        case 39: // right key
            if (!isModal) {
                move(1, 0)
                IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_right.png" 
            }
            break
        case 40: // down key
            if (!isModal) {
                move(0, 1)
                IMAGE_SNAKE.src = "./assets/snakeheads/snakehead_down.png" 
            }
            break
        case 72: handleHKey(); break            
        case 76: handleLKey(); break            
    }
}

function handleEnterKey() {
    if (isModal === 'form') {
        const value = document.querySelector('#highscore-form input[name="name"]').value
        if (value) insert(score, value)
        else alert('Insert name!')
    }
}

function handleEscKey() {
    if (isModal === 'help') hideHelp()
    else if (isModal === 'form') hideForm()
    else if (isModal === 'highscores') hideHighscores()
    else restart()
}

function handleSpaceKey() {
    if (!isModal) {
        isGameOver ? restart() : togglePause();
    }
}

function handleHKey() {
    if (!isModal) showHelp()
    else if(isModal === 'help') hideHelp()
}

function handleLKey() {
    if (!isModal) showHighscores()
    else if (isModal === 'highscores') hideHighscores()
}

function updateScore(multiply) 
{
    if (multiply === 0) score = 0
    else score += CAKE_VALUE * multiply
    document.getElementById('scoreboard').innerHTML = score;
}