// Mobile menu toggle
const toggle = document.getElementById('navToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  const setMenuState = (isOpen) => {
    links.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  toggle.addEventListener('click', () => {
    const isOpen = !links.classList.contains('open');
    setMenuState(isOpen);
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => setMenuState(false));
  });

  document.addEventListener('click', (event) => {
    if (!links.contains(event.target) && !toggle.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && links.classList.contains('open')) {
      setMenuState(false);
      toggle.focus();
    }
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
const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-nav.prev') : null;
const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-nav.next') : null;
const galleryCards = document.querySelectorAll('.project-card[data-image]');

if (lightbox && lightboxImage && lightboxClose && lightboxPrev && lightboxNext) {
  let currentGallery = [];
  let currentIndex = 0;

  const closeLightbox = () => {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const updateLightbox = (index) => {
    if (!currentGallery.length) return;
    currentIndex = (index + currentGallery.length) % currentGallery.length;
    lightboxImage.src = currentGallery[currentIndex].dataset.image;
  };

  const openLightbox = (card) => {
    const visibleCards = [...galleryCards].filter(item => item.style.display !== 'none');
    currentGallery = visibleCards;
    currentIndex = visibleCards.indexOf(card);
    if (currentIndex < 0) currentIndex = 0;
    updateLightbox(currentIndex);
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  galleryCards.forEach(card => {
    const open = () => {
      const src = card.dataset.image;
      if (src) openLightbox(card);
    };

    card.addEventListener('click', open);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open();
      }
    });
  });

  lightboxPrev.addEventListener('click', () => updateLightbox(currentIndex - 1));
  lightboxNext.addEventListener('click', () => updateLightbox(currentIndex + 1));
  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (event) => {
    if (!lightbox.classList.contains('open')) return;
    if (event.key === 'Escape') {
      closeLightbox();
    } else if (event.key === 'ArrowLeft') {
      updateLightbox(currentIndex - 1);
    } else if (event.key === 'ArrowRight') {
      updateLightbox(currentIndex + 1);
    }
  });
}

// Contact form submission
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

    const firstName = form.elements['fname'].value.trim();
    const lastName = form.elements['lname'].value.trim();
    const phone = form.elements['phone']?.value.trim() || 'Not provided';
    const service = form.elements['service']?.value.trim() || 'Not specified';
    const message = form.elements['message'].value.trim();

    const subject = encodeURIComponent(`Project enquiry from ${firstName} ${lastName}`);
    const body = encodeURIComponent(
      `Name: ${firstName} ${lastName}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone}\n` +
      `Service: ${service}\n\n` +
      `Project details:\n${message}`
    );

    const mailtoLink = `mailto:bhclcontractor@gmail.com?subject=${subject}&body=${body}`;

    status.classList.add('success');
    status.textContent = 'Your email app is opening with your message ready to send.';
    window.location.href = mailtoLink;
    form.reset();
  });
}
