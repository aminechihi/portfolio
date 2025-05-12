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

  // DOM Load Time
  const loadTime = window.performance.now().toFixed(2);
  logResult(`Page loaded in ${loadTime} ms`, "INFO");

  // Check if GitHub link exists and is reachable
  const githubLink = document.querySelector('a[href*="github.com"]');
  if (githubLink) {
    try {
      await fetch(githubLink.href, { method: "HEAD", mode: "no-cors" }); // `no-cors` used for demo only
      logResult("GitHub link found", "PASS");
    } catch {
      logResult("GitHub link could not be verified", "WARN");
    }
  } else {
    logResult("GitHub link not found", "FAIL");
  }
  
// Check for hidden broken link
const testLink = document.getElementById("testBrokenLink");
if (testLink) {
  try {
    const res = await fetch(testLink.href, { method: "HEAD" });
    if (!res.ok) {
      logResult("Broken link detected: /404-page-not-found.html", "FAIL");
    } else {
      logResult("Hidden test link is reachable", "PASS");
    }
  } catch (err) {
    logResult("Hidden test link fetch failed (expected)", "FAIL");
  }
}

  // Check if clickable icons have titles (for accessibility)
const iconLinks = document.querySelectorAll('a img');

iconLinks.forEach((img, idx) => {
  const parent = img.closest("a");
  const iconName = img.getAttribute("alt") || `Icon ${idx + 1}`;
  
  if (parent && parent.hasAttribute("title") && parent.getAttribute("title").trim() !== "") {
    logResult(`${iconName}: Title attribute present`, "PASS");
  } else {
    logResult(`${iconName}: Missing title attribute`, "WARN");
  }
});

  // Responsive check
  if (window.innerWidth < 600) {
    logResult("Mobile layout detected", "INFO");
  } else {
    logResult("Desktop layout active", "INFO");
  }

  logResult("Test run complete.", "INFO");
}



document.getElementById("rerunBtn").addEventListener("click", runRealTests);
window.addEventListener("load", runRealTests);

