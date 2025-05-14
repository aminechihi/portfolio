 document.addEventListener("DOMContentLoaded", function() {
    const postmanIcon = document.querySelector(".tool img[alt='Postman']");
    const apiConsole = document.getElementById("apiConsole");
    const closeConsoleAPI = document.getElementById("closeConsoleAPI");
    const sendRequest = document.getElementById("sendRequest");
    const apiInput = document.getElementById("apiInput");
    const output = document.getElementById("consoleOutputAPI");

    postmanIcon.addEventListener("click", function() {
      apiConsole.classList.remove("hidden");
    });

    closeConsoleAPI.addEventListener("click", function() {
      apiConsole.classList.add("hidden");
    });

    sendRequest.addEventListener("click", async function() {
      const endpoint = apiInput.value;
      if (endpoint) {
        output.innerHTML += `<p>[INFO] Testing endpoint: ${endpoint}</p>`;
        try {
          const response = await fetch(endpoint);
          const contentType = response.headers.get("content-type");
          let data;
          if (contentType && contentType.includes("application/json")) {
            data = await response.json();
            output.innerHTML += `<p>[PASS] Response (JSON): ${JSON.stringify(data)}</p>`;
          } else {
            data = await response.text();
            output.innerHTML += `<p>[PASS] Response (Text): ${data.substring(0, 200)}...</p>`;
          }
        } catch (error) {
          output.innerHTML += `<p>[ERROR] ${error.message}</p>`;
        }
        output.scrollTop = output.scrollHeight;
      } else {
        output.innerHTML += `<p>[ERROR] No endpoint provided.</p>`;
      }
    });
  });