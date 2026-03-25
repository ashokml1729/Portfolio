/* ═══════════════════════════════════════════
   THEME TOGGLE
   ═══════════════════════════════════════════ */
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Load saved theme or default to dark
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

/* ═══════════════════════════════════════════
   MOBILE MENU
   ═══════════════════════════════════════════ */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

/* ═══════════════════════════════════════════
   ACTIVE NAV LINK ON SCROLL
   ═══════════════════════════════════════════ */
const sections = document.querySelectorAll('.section, .hero');
const navLinkElements = document.querySelectorAll('.nav-link');

function updateActiveLink() {
  let current = '';
  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (window.scrollY >= top) {
      current = section.getAttribute('id');
    }
  });
  navLinkElements.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveLink, { passive: true });

/* ═══════════════════════════════════════════
   NAVBAR BACKGROUND ON SCROLL
   ═══════════════════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.borderBottomColor = 'var(--border)';
  } else {
    navbar.style.borderBottomColor = 'transparent';
  }
}, { passive: true });

/* ═══════════════════════════════════════════
   FADE-IN ON SCROLL
   ═══════════════════════════════════════════ */
const fadeElements = document.querySelectorAll(
  '.skill-card, .project-card, .cert-card, .contact-card'
);

fadeElements.forEach(el => el.classList.add('fade-in'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

fadeElements.forEach(el => observer.observe(el));

/* ═══════════════════════════════════════════
   PROJECT IMAGE CAROUSEL
   ═══════════════════════════════════════════ */
document.querySelectorAll('.project-carousel').forEach(carousel => {
  const images = carousel.querySelectorAll('.project-img');
  const dots = carousel.querySelectorAll('.carousel-dot');

  if (images.length <= 1) return;

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      images.forEach(img => img.classList.remove('active'));
      dots.forEach(d => d.classList.remove('active'));
      images[index].classList.add('active');
      dots[index].classList.add('active');
    });
  });

  // Auto-rotate every 4 seconds
  let current = 0;
  setInterval(() => {
    current = (current + 1) % images.length;
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    images[current].classList.add('active');
    dots[current].classList.add('active');
  }, 4000);
});
