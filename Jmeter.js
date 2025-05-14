
  const jmeterIcon = document.querySelector('img[alt="JMeter"]');
  const jmeterConsole = document.getElementById("jmeterConsole");
  const jmeterOutput = document.getElementById("jmeterOutput");
  const closeBtn = document.getElementById("closeJmeterConsole");

  jmeterIcon.parentElement.addEventListener("click", () => {
    jmeterConsole.style.display = "block";
    runJmeterTest();
  });

  closeBtn.addEventListener("click", () => {
    jmeterConsole.style.display = "none";
  });

  function runJmeterTest() {
    const url = "https://jsonplaceholder.typicode.com/posts";
    const totalRequests = 10;
    let completed = 0;
    let success = 0;
    let fail = 0;
    let times = [];

    jmeterOutput.textContent = `[INFO] Starting test...\n\n`;

    for (let i = 0; i < totalRequests; i++) {
      const start = performance.now();

      fetch(url)
        .then(res => {
          const end = performance.now();
          const duration = (end - start).toFixed(2);
          times.push(parseFloat(duration));
          if (res.ok) {
            success++;
          } else {
            fail++;
          }
        })
        .catch(() => {
          fail++;
        })
        .finally(() => {
          completed++;
          if (completed === totalRequests) {
            const avg = (
              times.reduce((a, b) => a + b, 0) / times.length
            ).toFixed(2);

            jmeterOutput.textContent += `Test Completed\n`;
            jmeterOutput.textContent += `✅ Success: ${success}\n`;
            jmeterOutput.textContent += `❌ Failures: ${fail}\n`;
            jmeterOutput.textContent += `⏱ Avg Response Time: ${avg} ms\n`;
          } else {
            jmeterOutput.textContent += `Request ${completed}/${totalRequests} completed...\n`;
          }
        });
    }
  }

