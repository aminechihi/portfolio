const bar = document.getElementById('loadingBar');
    let progress = 0;
    const totalBlocks = 20;

    const interval = setInterval(() => {
      progress += 1;
      const filled = Math.floor((progress / 100) * totalBlocks);
      const empty = totalBlocks - filled;
      const barStr = `[${'▓'.repeat(filled)}${'░'.repeat(empty)}] ${progress}%`;
      bar.textContent = barStr;

      if (progress >= 100) {
        clearInterval(interval);
        // Optional: Do something when complete
        // bar.textContent += " ✅";
      }
    }, 100); // 100ms = ~10 seconds total