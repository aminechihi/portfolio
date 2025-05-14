// Function to simulate showing/hiding the terminal window
function toggleConsole(id) {
  const terminal = document.getElementById(id);
  terminal.style.display = terminal.style.display === "none" || terminal.style.display === "" ? "block" : "none";
}

// Event listeners for each tool (icon click)
document.querySelector(".tool img[alt='Mantis']").addEventListener("click", () => {
  toggleConsole("mantisConsole");
});

document.querySelector(".tool img[alt='Test Link']").addEventListener("click", () => {
  toggleConsole("testLinkConsole");
});

// Function to simulate running MantisBT tests
function runMantisTests() {
  const logs = document.getElementById("mantisLogs");
  logs.textContent = "[INFO] Starting MantisBT test run...";

  const steps = [
    "[INFO] MantisBT: Checking for bug tracking project...",
    "[PASS] MantisBT: Bug tracking project loaded successfully.",
    "[INFO] MantisBT: Adding new bug report...",
    "[INFO] MantisBT: Entering bug details: 'UI not responsive on mobile'.",
    "[PASS] MantisBT: Bug report added successfully.",
    "[INFO] MantisBT: Verifying bug status...",
    "[PASS] MantisBT: Bug status is 'Open'.",
    "[INFO] MantisBT: Closing the bug report...",
    "[PASS] MantisBT: Bug report closed successfully.",
    "[INFO] MantisBT: Test run complete."
  ];

  let index = 0;
  const interval = setInterval(() => {
    logs.textContent += "\n" + steps[index];
    index++;

    if (index >= steps.length) {
      clearInterval(interval);
      logs.textContent += "\n[INFO] MantisBT test run complete.";
    }
  }, 1500);
}

// Function to simulate running TestLink tests
function runTestLinkTests() {
  const logs = document.getElementById("testLinkLogs");
  logs.textContent = "[INFO] Starting TestLink test run...";

  const steps = [
    "[INFO] TestLink: Accessing test management system...",
    "[PASS] TestLink: Test project loaded successfully.",
    "[INFO] TestLink: Creating a new test case...",
    "[INFO] TestLink: Entering test case details: 'Verify login functionality'.",
    "[PASS] TestLink: Test case created successfully.",
    "[INFO] TestLink: Verifying test case execution...",
    "[PASS] TestLink: Test case executed successfully.",
    "[INFO] TestLink: Adding result for test case...",
    "[INFO] TestLink: Entering result: 'Passed'.",
    "[PASS] TestLink: Test case result updated to 'Passed'.",
    "[INFO] TestLink: Test run complete."
  ];

  let index = 0;
  const interval = setInterval(() => {
    logs.textContent += "\n" + steps[index];
    index++;

    if (index >= steps.length) {
      clearInterval(interval);
      logs.textContent += "\n[INFO] TestLink test run complete.";
    }
  }, 1500);
}

// Close console functionality for MantisBT
document.getElementById("closeConsoleMantis").addEventListener("click", () => {
  document.getElementById("mantisConsole").style.display = "none";
});

// Close console functionality for TestLink
document.getElementById("closeConsoleTestLink").addEventListener("click", () => {
  document.getElementById("testLinkConsole").style.display = "none";
});
