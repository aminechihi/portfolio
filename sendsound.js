const input = document.getElementById("userInput");
const output = document.getElementById("output");
const sendBtn = document.getElementById("sendBtn");
const keySound = document.getElementById("keySound");
const logAreaTerminal = document.getElementById("logAreaterminal"); // new log area
const sendSound = document.getElementById("sendSound");
const triggerBugBtn = document.getElementById("triggerBugBtn");
const playCdBtn = document.getElementById("playcd");



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

function analyzeBugReport(message) {
  const lowerMsg = message.toLowerCase();

  const keywords = [
    "null", "undefined",
    "crash", "freeze", "hang",
    "slow", "lag", "delay",
    "ui", "button", "layout", "alignment", "responsive",
    "api", "endpoint", "response",
    "validation", "input", "form",
    "security", "vulnerability", "auth", "authentication", "authorization",
    "database", "db", "query", "data loss",
    "error", "exception", "stack trace",
    "memory", "leak",
    "compatibility", "browser", "device",
    "crash report", "debug",
    "install", "setup", "configuration"
  ];

  // Check if message contains any keyword
  const hasKeyword = keywords.some(keyword => lowerMsg.includes(keyword));

  if (!hasKeyword) {
    // If no keywords matched and message is non-empty, assume gibberish or unclear
    // Also check if message has at least some normal characters (letters or numbers)
    if (/[\w]/.test(lowerMsg)) {
      return "❓ Sorry, I couldn't understand your report. Please provide more details or clearer language.";
    } else {
      // Empty or no useful content
      return "⚠️ Empty or invalid bug report. Please describe the issue.";
    }
  }

  // Your existing checks, only run if keywords present
  if (lowerMsg.includes("null") || lowerMsg.includes("undefined")) {
    return "⚠️ Warning: Possible null or undefined variable access.";
  }
  if (lowerMsg.includes("crash") || lowerMsg.includes("freeze") || lowerMsg.includes("hang")) {
    return "💥 Crash or freeze issue detected. Check memory leaks or infinite loops.";
  }
  if (lowerMsg.includes("slow") || lowerMsg.includes("lag") || lowerMsg.includes("delay")) {
    return "🐢 Performance issue detected. Consider profiling the application.";
  }
  if (lowerMsg.includes("ui") || lowerMsg.includes("button") || lowerMsg.includes("layout") || lowerMsg.includes("alignment") || lowerMsg.includes("responsive")) {
    return "🎨 UI-related bug detected — verify event handlers and CSS.";
  }
  if (lowerMsg.includes("api") || lowerMsg.includes("endpoint") || lowerMsg.includes("response")) {
    return "🔗 API issue suspected — check request and response handling.";
  }
  if (lowerMsg.includes("validation") || lowerMsg.includes("input") || lowerMsg.includes("form")) {
    return "📝 Validation problem — verify input constraints and error messages.";
  }
  if (lowerMsg.includes("security") || lowerMsg.includes("vulnerability") || lowerMsg.includes("auth") || lowerMsg.includes("authentication") || lowerMsg.includes("authorization")) {
    return "🔒 Security concern noted — check authentication and authorization logic.";
  }
  if (lowerMsg.includes("database") || lowerMsg.includes("db") || lowerMsg.includes("query") || lowerMsg.includes("data loss")) {
    return "🗄️ Database-related bug — review queries and data integrity.";
  }
  if (lowerMsg.includes("error") || lowerMsg.includes("exception") || lowerMsg.includes("stack trace")) {
    return "⚠️ Error or exception reported — analyze logs and stack trace.";
  }
  if (lowerMsg.includes("memory") || lowerMsg.includes("leak")) {
    return "🧠 Possible memory leak — consider using profiling tools.";
  }
  if (lowerMsg.includes("compatibility") || lowerMsg.includes("browser") || lowerMsg.includes("device")) {
    return "🌐 Compatibility issue — test on various browsers and devices.";
  }
  if (lowerMsg.includes("crash report") || lowerMsg.includes("debug")) {
    return "🐞 Debug info received — great for root cause analysis.";
  }
  if (lowerMsg.includes("install") || lowerMsg.includes("setup") || lowerMsg.includes("configuration")) {
    return "⚙️ Setup or installation issue — verify environment and config.";
  }

  // Fallback in case something slips through
  return "✅ Bug report received. Our team will investigate this issue.";
}



sendBtn.addEventListener("click", () => {

  if(sendSound) {
    try {
      sendSound.currentTime = 0;
      sendSound.play();
    } catch (err) {
      // ignore if blocked by browser autoplay policies
    }
  }
  const message = input.value.trim();
  if (message) {
    const analysis = analyzeBugReport(message);

    // Create a container for this log entry
    const logEntry = document.createElement("div");
    logEntry.style.marginBottom = "1em";
    logEntry.style.whiteSpace = "pre-wrap"; // keep line breaks
    logEntry.style.fontFamily = "monospace";
    logEntry.textContent = `Log Report :\n> ${message}\n${analysis}`;

    // Append to the terminal log
    logAreaTerminal.appendChild(logEntry);

    // Clear input
    input.value = "";

    // Remove this log entry after 10 seconds
    setTimeout(() => {
      logAreaTerminal.removeChild(logEntry);
    }, 10000);

    // Continue to open mailto after short delay if you want
    setTimeout(() => {
      const mailto = `mailto:amine.chihi@hotmail.fr?subject=Portfolio Message&body=${encodeURIComponent(message)}`;
      window.location.href = mailto;
    }, 1000);
  }
});


/* trigger buf */

triggerBugBtn.addEventListener("click", () => {

  if(sendSound) {
    try {
      sendSound.currentTime = 0;
      sendSound.play();
    } catch (err) {
      // ignore if blocked by browser autoplay policies
    }
  }
  // Simulate a bug: trying to access property of undefined
  const brokenObject = undefined;
  console.log(brokenObject.someProperty); // 💥 This triggers an error
});

window.addEventListener("error", (event) => {
  const errorMessage = `🚨 JS Error Caught:\n> ${event.message}\nFile: ${event.filename}\nLine: ${event.lineno}`;
  console.error(errorMessage);

  const logEntry = document.createElement("div");
  logEntry.style.color = "red";
  logEntry.style.fontFamily = "monospace";
  logEntry.style.whiteSpace = "pre-wrap";
  logEntry.style.marginBottom = "1em";
  logEntry.textContent = errorMessage;

  logAreaterminal.appendChild(logEntry);

  setTimeout(() => {
    logAreaterminal.removeChild(logEntry);
  }, 10000);
});


/* play broken CD */


let glitchAudio = null; // track the audio instance
let isPlaying = false;

playCdBtn.addEventListener("click", () => {
  const timestamp = new Date().toLocaleTimeString();

  // If already playing, stop the sound and log it
  if (isPlaying && glitchAudio) {
    glitchAudio.pause();
    glitchAudio.currentTime = 0; // rewind to start
    isPlaying = false;

    const stopEntry = document.createElement("div");
    stopEntry.style.marginBottom = "1em";
    stopEntry.style.whiteSpace = "pre-wrap";
    stopEntry.style.fontFamily = "monospace";
    stopEntry.style.color = "yellow";
    stopEntry.textContent = `Log Report :\n> [${timestamp}] Broken media playback manually stopped.`;
    logAreaterminal.appendChild(stopEntry);
    setTimeout(() => logAreaterminal.removeChild(stopEntry), 10000);

    return;
  }

  // Not playing yet — start playback
  glitchAudio = new Audio("audio/glitch.mp3"); // replace with your real path
  isPlaying = true;

  const startEntry = document.createElement("div");
  startEntry.style.marginBottom = "1em";
  startEntry.style.whiteSpace = "pre-wrap";
  startEntry.style.fontFamily = "monospace";
  startEntry.textContent = `Log Report :\n> [${timestamp}] Attempting to play broken media...`;
  logAreaterminal.appendChild(startEntry);
  setTimeout(() => logAreaterminal.removeChild(startEntry), 10000);

  glitchAudio.play()
    .then(() => {
      const successEntry = document.createElement("div");
      successEntry.style.marginBottom = "1em";
      successEntry.style.whiteSpace = "pre-wrap";
      successEntry.style.fontFamily = "monospace";
      successEntry.style.color = "limegreen";
      successEntry.textContent = `Log Report :\n> [${timestamp}] Playback started successfully (may be corrupted).`;
      logAreaterminal.appendChild(successEntry);
      setTimeout(() => logAreaterminal.removeChild(successEntry), 10000);
    })
    .catch((error) => {
      isPlaying = false; // reset if error
      const errorEntry = document.createElement("div");
      errorEntry.style.marginBottom = "1em";
      errorEntry.style.whiteSpace = "pre-wrap";
      errorEntry.style.fontFamily = "monospace";
      errorEntry.style.color = "orange";
      errorEntry.textContent = `Log Report :\n> [${timestamp}] Playback failed:\n${error.message}`;
      logAreaterminal.appendChild(errorEntry);
      setTimeout(() => logAreaterminal.removeChild(errorEntry), 10000);
    });

  // Detect when playback ends naturally
  glitchAudio.addEventListener("ended", () => {
    isPlaying = false;
    const endEntry = document.createElement("div");
    endEntry.style.marginBottom = "1em";
    endEntry.style.whiteSpace = "pre-wrap";
    endEntry.style.fontFamily = "monospace";
    endEntry.style.color = "gray";
    endEntry.textContent = `Log Report :\n> [${timestamp}] Playback finished.`;
    logAreaterminal.appendChild(endEntry);
    setTimeout(() => logAreaterminal.removeChild(endEntry), 10000);
  });
});