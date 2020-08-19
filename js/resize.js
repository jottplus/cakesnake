/* CONSTANTS */
const CANVAS = document.getElementById('gc')
const TILE_COUNT_X = 40

function resize() 
{
    canvasHeight = window.innerHeight-75;
    CANVAS.width = window.innerWidth;
    CANVAS.height = canvasHeight;

    tileSize = Math.floor(window.innerWidth / TILE_COUNT_X);
    tileCountY = Math.floor(canvasHeight / tileSize);
}