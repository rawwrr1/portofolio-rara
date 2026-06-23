// ==========================================
// FITUR DARK / LIGHT MODE TOGGLE
// ==========================================
const themeToggleBtn = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('theme-icon-sun');
const moonIcon = document.getElementById('theme-icon-moon');

// Cek apakah user sebelumnya sudah pernah memilih tema di localStorage
const currentTheme = localStorage.getItem('theme');

// Jika ada tema tersimpan, langsung pasang saat halaman dimuat
if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);
  
  if (currentTheme === 'dark') {
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
}

// Fungsi ketika tombol toggle diklik
themeToggleBtn.addEventListener('click', () => {
  // Ambil tema aktif saat ini
  let theme = document.documentElement.getAttribute('data-theme');
  
  if (theme === 'dark') {
    // Ubah ke Light Mode
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    sunIcon.style.display = 'block';
    moonIcon.style.display = 'none';
  } else {
    // Ubah ke Dark Mode
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    sunIcon.style.display = 'none';
    moonIcon.style.display = 'block';
  }
});
// 1. Mobile Menu Toggler
const mobileToggle = document.querySelector('.mobile-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

function toggleMenu() {
  mobileToggle.classList.toggle('active');
  navMenu.classList.toggle('active');
}

if (mobileToggle) {
  mobileToggle.addEventListener('click', toggleMenu);
}

// Close menu when navigation link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('active')) {
      toggleMenu();
    }
  });
});

// 2. Sticky Header & Active Scrollspy
const header = document.querySelector('.header');
const spySections = document.querySelectorAll('.scroll-spy-section, .hero-section');

function handleScroll() {
  // Sticky header class trigger
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Scrollspy navigation link tracking
  let currentActiveId = '';
  const scrollPosition = window.scrollY + 150; // Offset for header height

  spySections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentActiveId = sectionId;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    const href = link.getAttribute('href');
    if (href === `#${currentActiveId}` || (currentActiveId === 'home' && href === '#')) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', handleScroll);
// Run on load to ensure initial correct state
window.addEventListener('DOMContentLoaded', handleScroll);

// 3. Scroll Reveal Animations (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      // Once revealed, we don't need to observe it anymore
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

// 4. Statistics Number Counter Animation
const statsElements = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      animateStats();
      statsAnimated = true;
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.5
});

const statsSection = document.querySelector('.about-stats-col');
if (statsSection) {
  statsObserver.observe(statsSection);
}

function animateStats() {
  statsElements.forEach(stat => {
    const target = parseInt(stat.getAttribute('data-target'), 10);
    const duration = 2000; // 2 seconds animation
    const stepTime = Math.abs(Math.floor(duration / target));
    let current = 0;
    
    const timer = setInterval(() => {
      current += 1;
      stat.textContent = current;
      if (current >= target) {
        stat.textContent = target;
        clearInterval(timer);
      }
    }, stepTime);
  });
}

// 5. Toast Notification System
const toastContainer = document.getElementById('toast-container');

function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = 'toast';
  
  // Custom SVG icon based on toast type
  let iconMarkup = '';
  if (type === 'success') {
    iconMarkup = `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
  } else {
    iconMarkup = `<svg class="toast-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
  }

  toast.innerHTML = `
    ${iconMarkup}
    <span class="toast-text">${message}</span>
  `;

  toastContainer.appendChild(toast);
  
  // Trigger transition animation
  setTimeout(() => toast.classList.add('active'), 50);
  
  // Auto dismiss toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('active');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// 6. CV Download Button Toast Trigger
const downloadCvBtn = document.getElementById('download-cv-btn');
if (downloadCvBtn) {
  downloadCvBtn.addEventListener('click', (e) => {
    e.preventDefault();
    showToast("Curriculum Vitae downloaded successfully!");
  });
}

// 7. Contact Form Submission Logic
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;
    
    // Set loading state on button
    submitBtn.innerHTML = `
      Sending Message...
      <svg class="btn-icon-right animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line><line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line></svg>
    `;
    submitBtn.style.pointerEvents = 'none';
    submitBtn.style.opacity = '0.8';

    // Simulate server request delay
    setTimeout(() => {
      showToast("Thank you! Your message has been received.");
      contactForm.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.style.pointerEvents = 'auto';
      submitBtn.style.opacity = '1';
    }, 1800);
  });
}

const certCards = document.querySelectorAll('.cert-card');
const certModal = document.getElementById('cert-modal');
const certOverlay = certModal.querySelector('.modal-overlay');
const certClose = certModal.querySelector('.modal-close');
const certViewer = document.getElementById('certificate-viewer');

function openCertModal(card) {
  // Mengambil elemen gambar thumbnail di dalam kartu sertifikat yang sedang diklik[cite: 7]
  const imgElement = card.querySelector('.cert-img-thumbnail');
  
  if (!imgElement) return;

  // Mengambil path src dan teks alt langsung dari thumbnail tersebut[cite: 7]
  const imgSrc = imgElement.getAttribute('src');
  const imgAlt = imgElement.getAttribute('alt');

  // Menyuntikkan langsung tag <img> gambar asli ke dalam modal viewer[cite: 7]
  certViewer.innerHTML = `
    <div style="display: flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
      <img src="${imgSrc}" alt="${imgAlt}" class="cert-modal-img" style="max-width: 100%; max-height: 80vh; object-fit: contain; border-radius: 8px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);">
    </div>
  `;

  // Aktifkan modal pop-up
  certModal.classList.add('active');
  certModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Kunci scroll halaman utama
}

function closeCertModal() {
  certModal.classList.remove('active');
  certModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = 'auto'; // Kembalikan scroll halaman utama
}

// Menghubungkan fungsi klik pada setiap kartu sertifikat[cite: 7]
certCards.forEach(card => {
  card.addEventListener('click', () => {
    openCertModal(card);
  });
});

// Event listener untuk menutup modal[cite: 7]
if (certClose) certClose.addEventListener('click', closeCertModal);
if (certOverlay) certOverlay.addEventListener('click', closeCertModal);

// Menutup modal secara instan dengan tombol Escape (ESC)
window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && certModal.classList.contains('active')) {
    closeCertModal();
  }
});