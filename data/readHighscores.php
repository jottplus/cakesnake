<?php
function readHighscores() {
    $string = file_get_contents("highscores.json");
    return ($string === false) ? 'Something wrong with String' : $string;
}

echo readHighscores();