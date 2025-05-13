let booted = false;

    document.body.addEventListener("click", () => {
      if (booted) return;
      booted = true;


// Wait for user click to trigger the animation
      const sound = document.getElementById("monitorSound");
      const content = document.getElementById("content");
      const flicker = document.getElementById("flickerEffect");
      const warningMessage = document.getElementById("warningMessage");

      // Hide the warning message as soon as the user clicks
      warningMessage.style.display = "none";

      // Play the power-on sound
      sound.volume = 0.5;
      sound.play().catch(() => {
        // If autoplay is blocked, show content anyway
        content.style.opacity = 1;
        startAnimations();
      });

      // Start the flicker effect immediately after the click
      flicker.style.opacity = 1;

      // After a short delay, stop flicker and show content
      setTimeout(() => {
        flicker.style.opacity = 0;
        content.style.opacity = 1;
        startAnimations();
      }, 1150); // Flicker lasts for 2 seconds
    });

    // Animations: Matrix Title + Loading Bar
    function startAnimations() {
      const titleEl = document.getElementById("matrixTitle");
      const finalText = titleEl.textContent;
      const letters = "アアイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
      let titleProgress = 0;

      const decodeInterval = setInterval(() => {
        const displayed = finalText
          .split("")
          .map((char, i) => {
            if (i < titleProgress) return finalText[i];
            if (char === " ") return " ";
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        titleEl.textContent = displayed;

        if (titleProgress >= finalText.length) {
          clearInterval(decodeInterval);
        }

        titleProgress += 1 / 2;
      }, 50);

      const loadingEl = document.getElementById("loadingBar");
      let percent = 0;
      const totalBlocks = 20;

      const loadingInterval = setInterval(() => {
        percent += 1;
        const filled = Math.floor((percent / 100) * totalBlocks);
        const bar = `[${"▓".repeat(filled)}${"░".repeat(totalBlocks - filled)}] ${percent}%`;
        loadingEl.textContent = bar;

        if (percent >= 100) {
          clearInterval(loadingInterval);
        }
      }, 100);
    }

