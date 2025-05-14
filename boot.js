let booted = false;

document.body.addEventListener("click", function () {
  if (booted) return;
  booted = true;

  const sound = document.getElementById("monitorSound");
  const content = document.getElementById("content");
  const flicker = document.getElementById("flickerEffect");
  const warningMessage = document.getElementById("warningMessage");
  const floppy = document.getElementById("floppyDisk");

  // Floppy animation
  const floppyFrames = [
    "images/floppy1.png",
    "images/floppy2.png",
    "images/floppy3.png"
  ];

  let frameIndex = 0;

  const playFloppyAnimation = () => {
    const interval = setInterval(() => {
      frameIndex++;
      if (frameIndex < floppyFrames.length) {
        floppy.src = floppyFrames[frameIndex];
      } else {
        clearInterval(interval);

        // ✅ Only hide the message after floppy is fully inserted
        warningMessage.style.display = "none";

        // CRT boot sequence
        startCRTSequence();
      }
    }, 200); // Slower for testing
  };

  const startCRTSequence = () => {
    sound.volume = 0.5;
    sound.play().catch(() => {
      content.style.opacity = 1;
      startAnimations();
    });

    flicker.style.opacity = 1;

    setTimeout(() => {
      flicker.style.opacity = 0;
      flicker.style.display = "none";
      content.style.opacity = 1;
      startAnimations();
    }, 1150);
  };

  playFloppyAnimation();
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

