document.querySelector(".tool img[alt='Playwright']").addEventListener("click", () => {
  document.getElementById("playwrightConsole").style.display = "block";
});

function runFakeTests() {
  const logs = document.getElementById("playwrightLogs");
  logs.textContent = "[INFO] Launching browser...";

  const steps = [
    "[INFO] Playwright: Clicking on 'AmineChihi terminal' input field...",
    "[INFO] Playwright: Typing 'initialize diagnostics...' into terminal.",
    "[PASS] Playwright: Terminal input recorded.",
    "[INFO] Playwright: Clicking 'Send' button...",
    "[PASS] Playwright: 'Send' button triggered and system started.",
    "[INFO] Playwright: Verifying system output...",
    "[PASS] Playwright: System output logged successfully.",
    "[INFO] Playwright: Checking GitHub link...",
    "[PASS] Playwright: GitHub link works as expected.",
    "[INFO] Playwright: Checking LinkedIn link...",
    "[PASS] Playwright: LinkedIn link opens correctly.",
    "[INFO] Playwright: Checking JavaScript Certificate link...",
    "[PASS] Playwright: JavaScript Certificate link opens correctly.",
    "[INFO] Playwright: Test run complete."
  ];

  let index = 0;

  const interval = setInterval(() => {
    logs.textContent += "\n" + steps[index];
    index++;

    if (index >= steps.length) {
      clearInterval(interval);
      logs.textContent += "\n[INFO] Test run complete.";
    }
  }, 1000);
}

document.getElementById("closeConsolePlaywright").addEventListener("click", () => {
  document.getElementById("playwrightConsole").style.display = "none";
});