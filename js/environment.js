const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
const help = document.getElementById('help')
const form = document.getElementById('highscore-form')
const highscore = document.getElementById('highscores')

const confirmHelpBtn = document.querySelector('#help .confirm')
let confirmHighscoresBtn = document.querySelector('#highscores .confirm')
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

function toggleElements(elements, state)
{
    elements.forEach(element => element.style.display = state)
}

function showHelp()
{   
    if (!isGamePaused) togglePause() 
    toggleElements([overlay, modal, help], 'block')
    confirmHelpBtn.addEventListener('click', helpButtonClick, false)
}

function hideHelp()
{
    localStorage.helpShown = true
    toggleElements([overlay, modal, help], 'none')
    confirmHelpBtn.removeEventListener('click', helpButtonClick, false)
}

function showForm()
{
    toggleElements([overlay, modal, form], 'block')
    insertHighscoreBtn.addEventListener('click', insertHighscore, false)
}

function hideForm()
{
    toggleElements([overlay, modal, form], 'none')
    insertHighscoreBtn.removeEventListener('click', insertHighscore, false)
}

function showHighscores()
{
    if (!isGamePaused) togglePause()
    getHighscores(displayHighscore)
}

function hideHighscores()
{
    confirmHighscoresBtn.removeEventListener('click', highscoreButtonClick, false)
    toggleElements([overlay, modal, highscore], 'none')
}

function sortHighscores(highscoreString)
{
    let scores = JSON.parse(highscoreString)
    return scores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1)
}

function displayHighscore()
{
    toggleElements([overlay, modal, highscore], 'block')
    let highscoreContent = '<h2>HIGHSCORES</h2>'
    for (let score of highscores) {
        highscoreContent += '<div class="row"><div class="row-left">'+score.name+'</div><div class="row-right">'+score.score+'</div></div>'
    }
    highscoreContent += '<div class="button confirm">OK</div>'
    highscore.innerHTML = highscoreContent;
    confirmHighscoresBtn = document.querySelector('#highscores .confirm')
    confirmHighscoresBtn.addEventListener('click', highscoreButtonClick, false)
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