const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.textContent = isOpen ? '×' : '☰';
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const track = document.getElementById('projectTrack');
const cards = [...track.querySelectorAll('.project-card')];
const prev = document.getElementById('prevProject');
const next = document.getElementById('nextProject');
const progress = document.getElementById('carouselProgress');
const count = document.getElementById('slideCount');
let current = 0;
let startX = 0;
let dragDelta = 0;

function visibleCards() {
  if (window.innerWidth <= 650) return 1;
  if (window.innerWidth <= 900) return 2;
  return 3;
}
function maxIndex() { return Math.max(0, cards.length - visibleCards()); }
function updateCarousel() {
  current = Math.min(current, maxIndex());
  const cardWidth = cards[0].getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  track.style.transform = `translateX(-${current * (cardWidth + gap)}px)`;
  progress.style.width = `${((current + 1) / (maxIndex() + 1)) * 100}%`;
  count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(maxIndex() + 1).padStart(2, '0')}`;
}
prev.addEventListener('click', () => { current = current <= 0 ? maxIndex() : current - 1; updateCarousel(); });
next.addEventListener('click', () => { current = current >= maxIndex() ? 0 : current + 1; updateCarousel(); });
window.addEventListener('resize', updateCarousel);
track.addEventListener('pointerdown', e => { startX = e.clientX; dragDelta = 0; });
track.addEventListener('pointerup', e => {
  dragDelta = e.clientX - startX;
  if (Math.abs(dragDelta) > 45) {
    current = dragDelta < 0 ? (current >= maxIndex() ? 0 : current + 1) : (current <= 0 ? maxIndex() : current - 1);
    updateCarousel();
  }
});
track.addEventListener('keydown', e => {
  if (e.key === 'ArrowRight') next.click();
  if (e.key === 'ArrowLeft') prev.click();
});
document.getElementById('year').textContent = new Date().getFullYear();
updateCarousel();
