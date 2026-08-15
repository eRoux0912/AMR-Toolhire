// Element references
const navbarToggler = document.getElementById('navbarToggler');
const navOffcanvasEl = document.getElementById('navOffcanvas');
const navLinks = navOffcanvasEl.querySelectorAll('.nav-link');

// Prevent scroll jump when focus returns to toggler on close
navOffcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
  navbarToggler.focus({ preventScroll: true });
});

// Close offcanvas nav after clicking a link, then scroll to target
// (only waits for the offcanvas to close if it's actually open —
// on desktop the links are always visible, so there's nothing to close)
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    const targetEl = document.querySelector(targetId);
    if (!targetEl) return;

    e.preventDefault();

    const offcanvasInstance = bootstrap.Offcanvas.getInstance(navOffcanvasEl);
    const isOpen = navOffcanvasEl.classList.contains('show');

    if (offcanvasInstance && isOpen) {
      navOffcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }, { once: true });
      offcanvasInstance.hide();
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth' });
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