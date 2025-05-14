// Function to simulate showing/hiding the terminal window
function toggleConsole(id) {
  const terminal = document.getElementById(id);
  terminal.style.display = terminal.style.display === "none" || terminal.style.display === "" ? "block" : "none";
}

// Event listeners for each tool (icon click)
document.querySelector(".tool img[alt='Selenium']").addEventListener("click", () => {
  toggleConsole("seleniumConsole");
});

document.querySelector(".tool img[alt='Cypress']").addEventListener("click", () => {
  toggleConsole("cypressConsole");
});

// Function to simulate running Cypress tests (focused on terminal interactions)
function runCypressTests() {
  const logs = document.getElementById("cypressLogs");
  logs.textContent = "[INFO] Starting Cypress test run...";

  const steps = [
    "[INFO] Cypress: Clicking on 'AmineChihi terminal' input field...",
    "[INFO] Cypress: Typing into terminal: 'run system check...'",
    "[PASS] Cypress: Terminal input successfully received.",
    "[INFO] Cypress: Clicking 'Send' button...",
    "[PASS] Cypress: 'Send' button triggered successfully.",
    "[INFO] Cypress: Verifying response from system...",
    "[PASS] Cypress: System response logged in terminal.",
    "[INFO] Cypress: Checking GitHub link...",
    "[PASS] Cypress: GitHub link works and opens correctly.",
    "[INFO] Cypress: Checking LinkedIn link...",
    "[PASS] Cypress: LinkedIn link works and opens correctly.",
    "[INFO] Cypress: Checking JavaScript Certificate link...",
    "[PASS] Cypress: JavaScript Certificate link works and opens correctly.",
    "[INFO] Cypress: Test run complete."
  ];

  let index = 0;
  const interval = setInterval(() => {
    logs.textContent += "\n" + steps[index];
    index++;

    if (index >= steps.length) {
      clearInterval(interval);
      logs.textContent += "\n[INFO] Cypress test run complete.";
    }
  }, 1500);
}

// Function to simulate running Selenium tests (focused on terminal interactions)
function runSeleniumTests() {
  const logs = document.getElementById("seleniumLogs");
  logs.textContent = "[INFO] Starting Selenium test run...";

  const steps = [
    "[INFO] Selenium: Clicking on 'AmineChihi terminal' input field...",
    "[INFO] Selenium: Typing 'run diagnostic test...' into terminal input.",
    "[PASS] Selenium: Input successfully recorded.",
    "[INFO] Selenium: Clicking 'Send' button...",
    "[PASS] Selenium: 'Send' button clicked and function triggered.",
    "[INFO] Selenium: Waiting for system response...",
    "[PASS] Selenium: System output displayed in terminal.",
    "[INFO] Selenium: Checking GitHub link...",
    "[PASS] Selenium: GitHub link opened successfully in new tab.",
    "[INFO] Selenium: Checking LinkedIn link...",
    "[PASS] Selenium: LinkedIn link opened successfully.",
    "[INFO] Selenium: Checking JavaScript Certificate link...",
    "[PASS] Selenium: JavaScript Certificate link navigates correctly.",
    "[INFO] Selenium: Test run complete."
  ];

  let index = 0;
  const interval = setInterval(() => {
    logs.textContent += "\n" + steps[index];
    index++;

    if (index >= steps.length) {
      clearInterval(interval);
      logs.textContent += "\n[INFO] Selenium test run complete.";
    }
  }, 1500);
}



// Close console functionality
document.getElementById("closeConsoleSelenium").addEventListener("click", () => {
  document.getElementById("seleniumConsole").style.display = "none";
});

document.getElementById("closeConsoleCypress").addEventListener("click", () => {
  document.getElementById("cypressConsole").style.display = "none";
});


