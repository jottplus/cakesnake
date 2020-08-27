<?php
function save($name, $score)
{
    $string = file_get_contents("highscores.json");
    if ($string === false) return false;

    $highscores = json_decode($string, true);
    usort($highscores, function($a, $b){ return $a['score'] > $b['score']; });
    if (count($highscores) > 9) array_shift($highscores);
    $highscores[] = array('name' => $name, 'score' => $score);   

    $file = fopen('highscores.json', 'w');
    fwrite($file, json_encode($highscores));
    fclose($file);

    return file_get_contents("highscores.json");
}

$result = save($_GET['name'], $_GET['score']);

echo $result ? $result : false;