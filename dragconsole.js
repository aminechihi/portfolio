function makeDraggable(element) {
  const header = element.querySelector(".console-header");
  let offsetX = 0, offsetY = 0, isDragging = false;

  function onMouseDown(e) {
    isDragging = true;
    offsetX = e.clientX - element.offsetLeft;
    offsetY = e.clientY - element.offsetTop;
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  }

  function onTouchStart(e) {
    isDragging = true;
    const touch = e.touches[0];
    offsetX = touch.clientX - element.offsetLeft;
    offsetY = touch.clientY - element.offsetTop;
    document.addEventListener("touchmove", onTouchMove);
    document.addEventListener("touchend", onTouchEnd);
  }

  function onMouseMove(e) {
    if (isDragging) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }
  }

  function onTouchMove(e) {
    if (isDragging) {
      const touch = e.touches[0];
      element.style.left = `${touch.clientX - offsetX}px`;
      element.style.top = `${touch.clientY - offsetY}px`;
    }
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }

  function onTouchEnd() {
    isDragging = false;
    document.removeEventListener("touchmove", onTouchMove);
    document.removeEventListener("touchend", onTouchEnd);
  }

  header.addEventListener("mousedown", onMouseDown);
  header.addEventListener("touchstart", onTouchStart, { passive: false });
}

window.addEventListener("load", () => {
  const consoleElement = document.getElementById("testConsole");
  makeDraggable(consoleElement);
});

document.getElementById("closeConsole").addEventListener("click", () => {
  document.getElementById("testConsole").style.display = "none";
});
