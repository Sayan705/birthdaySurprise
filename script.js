// navigation between screens with fade effect
function nextScreen(number) {
  const current = document.querySelector('.screen.active');
  const next = document.getElementById(`screen${number}`);
  if (!next || current === next) return;

  current.classList.remove('active');
  next.classList.add('active');
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
