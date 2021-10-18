document.addEventListener('keydown', handleControls);

function blockInput() {
    return;
}

function handleControls(evt) {
    // first arrow keys starts game
    if (!isGameStarted && [37, 38, 39, 40].includes(evt.keyCode)) isGameStarted = true;
    if (ALLOWED_KEYS.includes(evt.keyCode)) KEY_MAPS[evt.keyCode][modalState]();
}