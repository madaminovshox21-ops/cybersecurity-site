const status = document.querySelector('.status-dot');
const dashboard = document.querySelector('.dashboard-main');

// A subtle interactive parallax effect keeps the 3D security dashboard alive.
const visual = document.querySelector('.hero-visual');
if (visual && dashboard && window.matchMedia('(pointer:fine)').matches) {
  visual.addEventListener('pointermove', (event) => {
    const rect = visual.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    dashboard.style.transform = `rotateY(${x * -20 - 14}deg) rotateX(${y * -12 + 7}deg) rotateZ(-3deg) translateZ(12px)`;
  });

  visual.addEventListener('pointerleave', () => {
    dashboard.style.transform = '';
  });
}

// Gives the live status indicator a gentle pulse without external dependencies.
if (status) {
  setInterval(() => {
    status.style.opacity = status.style.opacity === '0.45' ? '1' : '0.45';
  }, 1100);
}

// Smoothly reveal content cards as they enter the viewport.
const revealItems = document.querySelectorAll('.info-card, .glass-panel, .cta-band');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.animate(
        [
          { opacity: 0, transform: 'translateY(18px)' },
          { opacity: 1, transform: 'translateY(0)' },
        ],
        { duration: 650, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'forwards' },
      );
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealItems.forEach((item) => observer.observe(item));
