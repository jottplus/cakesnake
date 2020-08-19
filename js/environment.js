const confirmHelpBtn = document.querySelector('#help .confirm');
const confirmHighscoresBtn = document.querySelector('#highscores .confirm');

const helpButtonClick = function(event) {
    event.preventDefault();
    hideHelp();
}

function showHelp()
{   
	if (!isGamePaused) togglePause() 
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('help').style.display = 'block';
    confirmHelpBtn.addEventListener('click', helpButtonClick, false);
}

function hideHelp()
{
    localStorage.helpShown = true;
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('help').style.display = 'none';
    confirmHelpBtn.removeEventListener('click', helpButtonClick, false);
}

const highscoreButtonClick = function(event) {
    event.preventDefault();
    hideHighscores();
}

function showHighscores()
{
    if (!isGamePaused) togglePause()
    document.getElementById('overlay').style.display = 'block';
    document.getElementById('highscores').style.display = 'block';
    confirmHighscoresBtn.addEventListener('click', highscoreButtonClick, false);
}

function hideHighscores()
{
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('highscores').style.display = 'none';
    confirmHighscoresBtn.removeEventListener('click', highscoreButtonClick, false);
}