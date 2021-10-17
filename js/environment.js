const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
const help = document.getElementById('help')
const form = document.getElementById('highscore-form')
const highscore = document.getElementById('highscores')

const confirmHelpBtn = document.querySelector('#help .confirm')
let confirmHighscoresBtn = document.querySelector('#highscores .confirm')
const insertHighscoreBtn = document.querySelector('#highscore-form .insert')

const helpButtonClick = function (event) {
    event.preventDefault()
    hideHelp()
}

const insertHighscore = function (event) {
    event.preventDefault()
    const value = document.querySelector('#highscore-form input[name="name"]').value
    if (value) insert(score, value)
    else alert('Insert name!')
}

const highscoreButtonClick = function (event) {
    event.preventDefault()
    hideHighscores()
}

function toggleElements(elements, state) {
    elements.forEach(element => element.style.display = state)
}

function showHelp() {
    if (!isGamePaused) togglePause()
    toggleElements([overlay, modal, help], 'block')
    isModal = 'help'
    confirmHelpBtn.addEventListener('click', helpButtonClick, false)
}

function hideHelp() {
    localStorage.helpShown = true
    toggleElements([overlay, modal, help], 'none')
    isModal = false
    confirmHelpBtn.removeEventListener('click', helpButtonClick, false)
}

function showForm() {
    toggleElements([overlay, modal, form], 'block')
    isModal = 'form'
    insertHighscoreBtn.addEventListener('click', insertHighscore, false)
}

function hideForm() {
    toggleElements([overlay, modal, form], 'none')
    isModal = false
    insertHighscoreBtn.removeEventListener('click', insertHighscore, false)
}

function showHighscores() {
    if (!isGamePaused) togglePause()
    isModal = 'highscores'
    getHighscores(displayHighscore)
}

function hideHighscores() {
    toggleElements([overlay, modal, highscore], 'none')
    isModal = false
    confirmHighscoresBtn.removeEventListener('click', highscoreButtonClick, false)
}

function sortHighscores(highscoreString) {
    let scores = JSON.parse(highscoreString)
    return scores.sort((a, b) => (parseInt(a.score) < parseInt(b.score)) ? 1 : -1)
}

function displayHighscore() {
    toggleElements([overlay, modal, highscore], 'block')
    let highscoreContent = '<h2>HIGHSCORES</h2>'
    sortHighscores();

    for (let score of highscores) {
        highscoreContent += '<div class="row"><div class="row-left">' + score.name + '</div><div class="row-right">' + score.score + '</div></div>'
    }
    highscoreContent += '<div class="button confirm">OK</div>'
    highscore.innerHTML = highscoreContent;
    confirmHighscoresBtn = document.querySelector('#highscores .confirm')
    confirmHighscoresBtn.addEventListener('click', highscoreButtonClick, false)
}

function getHighscores(callback) {
    highscores = JSON.parse(localStorage.getItem('highscores') || '[]');
    if (callback) callback();
}

function insert(score, name) {
    getHighscores();
    sortHighscores();

    if (highscores.length < 10) {
        highscores.push({ name, score });
        localStorage.setItem('highscores', JSON.stringify(highscores));
    } else if (highscores.length == 10 && highscores.slice(-1)[0].score < score) {
        highscores.pop();
        highscores.push({ name, score });
    }

    hideForm();
    isModal = 'highscores';
    displayHighscore();
}

function sortHighscores() {
    highscores.sort((a, b) => {
        if (a.score < b.score) return 1
        if (a.score > b.score) return -1
        return 0;
    });
}