const overlay = document.getElementById('overlay')
const help = document.getElementById('help')
const form = document.getElementById('highscore-form')
const highscore = document.getElementById('highscores')

const confirmHelpBtn = document.querySelector('#help .confirm')
const confirmHighscoresBtn = document.querySelector('#highscores .confirm')
const insertHighscoreBtn = document.querySelector('#highscore-form .insert')

const helpButtonClick = function(event) {
    event.preventDefault()
    hideHelp()
}

const insertHighscore = function(event) {
    event.preventDefault()
    const value = document.querySelector('#highscore-form input[name="name"]').value
    if (value) insert(score, value)
    else alert('Insert name!')
}

const highscoreButtonClick = function(event) {
    event.preventDefault()
    hideHighscores()
}
function toggleElement(element, state)
{
    element.style.display = state
}

function showHelp()
{   
	if (!isGamePaused) togglePause() 
    toggleElement(overlay, 'block')
    toggleElement(help, 'block')
    confirmHelpBtn.addEventListener('click', helpButtonClick, false)
}

function hideHelp()
{
    localStorage.helpShown = true
    toggleElement(overlay, 'none')
    toggleElement(help, 'none')
    confirmHelpBtn.removeEventListener('click', helpButtonClick, false)
}

function showForm()
{
    toggleElement(overlay, 'block')
    toggleElement(form, 'block')
    insertHighscoreBtn.addEventListener('click', insertHighscore, false)
}

function hideForm()
{
    toggleElement(overlay, 'none')
    toggleElement(form, 'none')
    insertHighscoreBtn.removeEventListener('click', insertHighscore, false)
}

function showHighscores()
{
    if (!isGamePaused) togglePause()
    getHighscores(displayHighscore)
}

function hideHighscores()
{
    toggleElement(overlay, 'none')
    highscore.style.display = 'none';
    confirmHighscoresBtn.removeEventListener('click', highscoreButtonClick, false);
}

function sortHighscores(highscoreString)
{
    let scores = JSON.parse(highscoreString)
    return scores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1)
}

function displayHighscore()
{
    toggleElement(overlay, 'block')
    toggleElement(highscore, 'block')
    let highscoreContent = ''
    for (let score of highscores) {
        highscoreContent += '<div class="instruction"><div class="name">'+score.name+'</div><div class="score">'+score.score+'</div></div>';
    }
    highscore.innerHTML = highscoreContent;
    confirmHighscoresBtn.addEventListener('click', highscoreButtonClick, false);
}

function getHighscores(callback)
{
    ajaxRequest('GET', 'http://cakesnake.jottplus.de/data/readHighscores.php', function(response) {
        highscores = sortHighscores(response)
        if (callback) callback()
    })
}

function insert(score, name)
{
    let data = '?name='+name+'&score='+score
    ajaxRequest('POST', 'http://cakesnake.jottplus.de/data/insertHighscore.php'+data, function(response) {
        highscores = sortHighscores(response)
        hideForm()
        displayHighscore()
    })
}

function ajaxRequest(type, url, callback)
{
    let xhr = new XMLHttpRequest()
    xhr.open(type, url, true)
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8")
    xhr.onload = function () {
        callback(this.responseText)
    }
    xhr.send()
}