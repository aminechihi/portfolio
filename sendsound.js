const input = document.getElementById("userInput");
const output = document.getElementById("output");
const sendBtn = document.getElementById("sendBtn");
const keySound = document.getElementById("keySound");

function playKeySound() {
  try {
    keySound.currentTime = 0;
    keySound.play();
  } catch (err) {
    // Mobile browsers may block autoplay without gesture
  }
}

// Detect real keystrokes (desktop)
document.addEventListener("keydown", (e) => {
  if (!e.metaKey && !e.ctrlKey && !e.altKey && e.key.length === 1) {
    playKeySound();
  }
});

// Detect actual input (mobile-friendly)
input.addEventListener("input", () => {
  playKeySound();
});

// Also handle tap on input to "unlock" audio
input.addEventListener("touchstart", () => {
  keySound.play().catch(() => {});
});

sendBtn.addEventListener("click", () => {
  const message = input.value.trim();
  if (message) {
    const mailto = `mailto:amine.chihi@hotmail.fr?subject=Portfolio Message&body=${encodeURIComponent(
      message
    )}`;
    window.location.href = mailto;
    output.textContent += `\n> ${message}`;
    input.value = "";
  }
});

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});
