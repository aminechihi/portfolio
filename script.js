document.addEventListener('keydown', function(event) {
    // Check if the key pressed matches the ones we have on the keyboard
    const key = document.getElementById(`key-${event.key.toUpperCase()}`);

    if (key) {
        key.classList.add('pressed'); // Add the pressed animation
    }
});

document.addEventListener('keyup', function(event) {
    const key = document.getElementById(`key-${event.key.toUpperCase()}`);
    if (key) {
        key.classList.remove('pressed'); // Remove the pressed animation
    }
});
