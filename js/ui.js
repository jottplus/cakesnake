const overlay = document.getElementById('overlay')
const modal = document.getElementById('modal')
const help = document.getElementById('help')
const form = document.getElementById('highscore-form')
const highscore = document.getElementById('highscores')

const confirmHelpBtn = document.querySelector('#help .confirm')
let confirmHighscoresBtn = document.querySelector('#highscores .confirm')
const insertHighscoreBtn = document.querySelector('#highscore-form .insert')

// event handler functions
const helpButtonClick = function (event) {
    event.preventDefault();
    toggleHelp(false);
}

const highscoreButtonClick = function (event) {
    event.preventDefault();
    toggleHighscores(false);
}

const insertButtonClick = function (event) {
    event.preventDefault()
    const value = document.querySelector('#highscore-form input[name="name"]').value
    if (value) insertHighscore(score, value)
    else alert('Insert name!')
}

// help dialog
function toggleHelp(show) {
    if (show && !isGamePaused) togglePause();
    else if (!show) localStorage.helpShown = true
    toggleElements([overlay, modal, help], show ? 'block' : 'none');
    modalState = show ? 2 : 0;
    if (show) confirmHelpBtn.addEventListener('click', helpButtonClick, false)
    else confirmHelpBtn.removeEventListener('click', helpButtonClick, false)
}

// form dialog
function toggleForm(show) {
    toggleElements([overlay, modal, form], show ? 'block' : 'none');
    modalState = show ? 1 : 0
    if (show) insertHighscoreBtn.addEventListener('click', insertButtonClick, false)
    else insertHighscoreBtn.removeEventListener('click', insertButtonClick, false)
}

// highscores dialog
function toggleHighscores(show) {
    if (show && !isGamePaused) togglePause();
    else if (!show) toggleElements([overlay, modal, highscore], 'none');
    modalState = show ? 3 : 0;
    if (show) {
        toggleElements([overlay, modal, highscore], 'block');
        getHighscores(displayHighscores);
    } else confirmHighscoresBtn.removeEventListener('click', highscoreButtonClick, false);
}

function toggleElements(elements, state) {
    elements.forEach(element => element.style.display = state)
}