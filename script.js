// Create animated hearts with random position and size
function createHearts() {
  const container = document.querySelector('.hearts-container');
  container.innerHTML = '';
  const heartCount = 8;
  const hearts = ['❤️', '💕', '💖', '💗', '💝'];
  
  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    // random horizontal start
    heart.style.left = Math.random() * 90 + 5 + '%';
    // random size between 6 and 10rem
    heart.style.fontSize = (6 + Math.random() * 4) + 'rem';
    // random animation duration and delay
    heart.style.animationDuration = (7 + Math.random() * 3) + 's';
    heart.style.animationDelay = (Math.random() * 5) + 's';
    container.appendChild(heart);
  }
}

// Initialize hearts on page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createHearts);
} else {
  createHearts();
}

// navigation between screens with fade effect
function nextScreen(number) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(`screen${number}`);
  if (!next || current === next) return;

  current.classList.remove('active');
  next.classList.add('active');

  // if we navigated to final screen, start audio playback
  if (number === 4) {
    const audio = next.querySelector('audio');
    if (audio) {
      // try to play; some browsers require a user gesture, but
      // since navigation is via button click we should be allowed
      audio.play().catch(() => {
        // ignore if autoplay blocked; user can hit play manually
      });
    }
  }
}

// optional: allow arrow keys for navigation
window.addEventListener('keydown', (e) => {
  const active = document.querySelector('.screen.active');
  if (!active) return;
  let id = active.id.replace('screen', '');
  if (e.key === 'ArrowRight') {
    nextScreen(parseInt(id, 10) + 1);
  }
  if (e.key === 'ArrowLeft') {
    const prev = parseInt(id, 10) - 1;
    if (prev >= 1) nextScreen(prev);
  }
});

// launch confetti for a few seconds using canvas-confetti library
function launchConfetti() {
  const duration = 5 * 1000;
  const end = Date.now() + duration;

  (function frame() {
    confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0 } });
    confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1 } });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  }());
}

// restart the sequence by going back to first screen
function restart() {
  nextScreen(1);
  const audio = document.querySelector('#screen4 audio');
  if (audio) {
    audio.currentTime = 0;
    audio.pause();
  }
}
