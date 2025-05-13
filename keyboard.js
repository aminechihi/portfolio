// Keyboard press animation (desktop)
document.addEventListener('keydown', function(event) {
  const key = document.getElementById(`key-${event.key.toUpperCase()}`);
  if (key) {
    key.classList.add('pressed');
  }
});

document.addEventListener('keyup', function(event) {
  const key = document.getElementById(`key-${event.key.toUpperCase()}`);
  if (key) {
    key.classList.remove('pressed');
  }
});

// Mobile support: simulate press animation on input
const inputField = document.getElementById('userInput');
let lastInputLength = 0;

inputField.addEventListener('input', () => {
  const val = inputField.value;
  const typedChar = val[val.length - 1];

  // Only trigger animation for added characters
  if (val.length > lastInputLength && typedChar) {
    const key = document.getElementById(`key-${typedChar.toUpperCase()}`);
    if (key) {
      key.classList.add('pressed');
      setTimeout(() => key.classList.remove('pressed'), 150); // Temporary animation
    }
  }

  lastInputLength = val.length;
});
