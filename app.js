// Close offcanvas nav after clicking a link, then scroll to target
const navOffcanvasEl = document.getElementById('navOffcanvas');
const navLinks = navOffcanvasEl.querySelectorAll('.nav-link');

navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    const offcanvasInstance = bootstrap.Offcanvas.getInstance(navOffcanvasEl);

    if (offcanvasInstance && targetEl) {
      e.preventDefault(); // stop the default instant jump
      navOffcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }, { once: true });
      offcanvasInstance.hide();
    }
  });
});

// Animations

const fadeItems = document.querySelectorAll('.fade-in-item');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

fadeItems.forEach(item => fadeObserver.observe(item));