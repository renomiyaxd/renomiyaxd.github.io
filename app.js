document.addEventListener("DOMContentLoaded", () => {
    const texts = document.querySelectorAll(".fade-in-text");
    const positions = [];
    let delay = 0;
  
    texts.forEach((text, index) => {
      let top, left;
      let overlapping;
      let attempts = 0;
      const maxAttempts = 10;
  
      do {
        overlapping = false;
        attempts++;
  

        const container = document.querySelector('.container');
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
  

        top = Math.random() * (containerHeight - 50);
        left = Math.random() * (containerWidth - 100);
  
        // Check for overlaps with already positioned elements
        for (const pos of positions) {
          if (
            top < pos.top + pos.height + 5 &&
            top + text.clientHeight > pos.top+ 5 &&
            left < pos.left + pos.width + 5 &&
            left + text.clientWidth > pos.left + 5
          ) {
            overlapping = true;
            break;
          }
        }
      } while (overlapping && attempts < maxAttempts);
  
      if (!overlapping) {

        text.style.top = top + 'px';
        text.style.left = left + 'px';
        positions.push({
          top: top,
          left: left,
          width: text.clientWidth,
          height: text.clientHeight,
        });
  
        setTimeout(() => {
          text.style.opacity = 1;
        }, delay);
        delay += 500; // Adjust delay for each subsequent text
      } else {
        // If overlapping, remove the element from the DOM
        text.remove();
      }
    });
  });
  