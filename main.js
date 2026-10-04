// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => links.classList.remove('open'));
  });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  navbar.classList.toggle('scrolled', window.scrollY > 80);
});

// Project category filter
const filterTabs = document.querySelectorAll('.filter-tab');
const projectCards = document.querySelectorAll('.project-card[data-category]');
if (filterTabs.length && projectCards.length) {
  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.dataset.filter;
      projectCards.forEach(card => {
        const show = cat === 'all' || card.dataset.category === cat;
        card.style.display = show ? '' : 'none';
      });
    });
  });
}

// Project image lightbox
const lightbox = document.getElementById('projectLightbox');
const lightboxImage = lightbox ? lightbox.querySelector('.lightbox-image') : null;
const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
const galleryCards = document.querySelectorAll('.project-card[data-image]');

if (lightbox && lightboxImage && lightboxClose) {
  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const openLightbox = (src) => {
    lightboxImage.src = src;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  galleryCards.forEach(card => {
    const open = () => {
      const src = card.dataset.image;
      if (src) openLightbox(src);
    };

    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
}

// Contact form (client-side only demo)
const form = document.getElementById('contactForm');
if (form) {
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', e => {
    e.preventDefault();
    status.className = 'form-status';
    status.textContent = '';
    const required = ['fname', 'lname', 'email', 'message'];
    const missing = required.filter(id => !form.elements[id].value.trim());
    if (missing.length) {
      status.classList.add('error');
      status.textContent = 'Please fill in the required fields.';
      return;
    }
    const email = form.elements['email'].value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      status.classList.add('error');
      status.textContent = 'Please enter a valid email address.';
      return;
    }
    status.classList.add('success');
    status.textContent = 'Thanks — your message has been prepared. We will get back to you shortly.';
    form.reset();
  });
}
