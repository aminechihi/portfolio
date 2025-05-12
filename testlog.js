const logArea = document.getElementById("logArea");

function logResult(message, status) {
  const line = document.createElement("span");
  line.textContent = `[${status}] ${message}\n`;
  line.className = status.toLowerCase();
  logArea.appendChild(line);
  logArea.scrollTop = logArea.scrollHeight;
}

async function runRealTests() {
  logArea.innerHTML = "";

  const loadTime = window.performance.now().toFixed(2);
  logResult(`Page loaded in ${loadTime} ms`, "INFO");

  const githubLink = document.querySelector('a[href*="github.com"]');
  if (githubLink) {
    try {
      await fetch(githubLink.href, { method: "HEAD", mode: "no-cors" });
      logResult("GitHub link found", "PASS");
    } catch {
      logResult("GitHub link could not be verified", "WARN");
    }
  } else {
    logResult("GitHub link not found", "FAIL");
  }

  const testLink = document.getElementById("testBrokenLink");
  if (testLink) {
    try {
      const res = await fetch(testLink.href, { method: "HEAD" });
      if (!res.ok) {
        logResult("Broken link detected: /404-page-not-found.html", "FAIL");
      } else {
        logResult("Hidden test link is reachable", "PASS");
      }
    } catch {
      logResult("Hidden test link fetch failed (expected)", "FAIL");
    }
  }

  const iconLinks = document.querySelectorAll('a img');
  iconLinks.forEach((img, idx) => {
    const parent = img.closest("a");
    const iconName = img.getAttribute("alt") || `Icon ${idx + 1}`;
    if (parent?.getAttribute("title")?.trim()) {
      logResult(`${iconName}: Title attribute present`, "PASS");
    } else {
      logResult(`${iconName}: Missing title attribute`, "WARN");
    }
  });

  if (window.innerWidth < 600) {
    logResult("Mobile layout detected", "INFO");
  } else {
    logResult("Desktop layout active", "INFO");
  }

  logResult("Test run complete.", "INFO");
}

// NEW TESTS BELOW THIS LINE

function checkDuplicateIds() {
  const ids = [...document.querySelectorAll("*")]
    .map(el => el.id)
    .filter(Boolean);
  const duplicates = ids.filter((id, i, arr) => arr.indexOf(id) !== i);
  return duplicates.length > 0;
}

function checkAriaLabels() {
  const elements = document.querySelectorAll("button, a, input");
  return [...elements].every(el =>
    el.hasAttribute("aria-label") || el.textContent.trim() !== ""
  );
}

function simulateApiLatency() {
  return Math.floor(Math.random() * 300); // 0–299ms
}

let loopCount = 0;
function runContinuousTests() {
  setInterval(() => {
    logResult("Checking for duplicate IDs", checkDuplicateIds() ? "FAIL" : "PASS");
    logResult("ARIA labels on interactive elements", checkAriaLabels() ? "PASS" : "WARN");

    const latency = simulateApiLatency();
    logResult(`Simulated API latency: ${latency}ms`, latency < 200 ? "PASS" : "FAIL");

    loopCount++;
    if (loopCount % 6 === 0) {
      logResult("⚠️ Simulated critical memory leak detected!", "FAIL");
    }

    logResult("Background test cycle complete.\n", "INFO");
  }, 10000); // every 10s
}

document.getElementById("rerunBtn").addEventListener("click", runRealTests);
window.addEventListener("load", () => {
  runRealTests();
  runContinuousTests();
});
