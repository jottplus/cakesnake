function getHighscores(callback) {
    highscores = JSON.parse(localStorage.getItem('highscores') || '[]');
    if (callback) callback();
}

function sortHighscores() {
    highscores = highscores.sort((a, b) => {
        if (a.score < b.score) return 1;
        if (a.score > b.score) return -1;
        return 0;
    });
}

function sendName() {
    const value = document.querySelector('#highscore-form input[name="name"]').value;
    if (value) insertHighscore(score, value);
    else alert('Insert name!');
}

function displayHighscores() {
    let highscoreContent = '<h2>HIGHSCORES</h2>';
    sortHighscores();

    for (let score of highscores) {
        highscoreContent += '<div class="row"><div class="row-left">' + score.name + '</div><div class="row-right">' + score.score + '</div></div>';
    }
    highscoreContent += '<div class="button confirm">OK</div>';
    highscore.innerHTML = highscoreContent;
    confirmHighscoresBtn = document.querySelector('#highscores .confirm');
    confirmHighscoresBtn.addEventListener('click', highscoreButtonClick, false);
}

function insertHighscore(score, name) {
    getHighscores();
    sortHighscores();

    if (highscores.length < 10) {
        highscores.push({ name, score });
    } else if (highscores.length == 10 && highscores.slice(-1)[0].score < score) {
        highscores.pop();
        highscores.push({ name, score });
    }

    localStorage.setItem('highscores', JSON.stringify(highscores));
    toggleForm(false);
    modalState = 3;
    toggleElements([overlay, modal, highscore], 'block');
    displayHighscores();
}