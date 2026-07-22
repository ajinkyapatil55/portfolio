/* ============================================================
   AJINKYA PATIL — PORTFOLIO JAVASCRIPT
   File: js/script.js
   Version: 3.0
   ============================================================ */

'use strict';

/* ── 1. NAVBAR SCROLL ── */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run on load
}

/* ── 2. SMOOTH SCROLL ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      // Close mobile menu if open
      const navLinks = document.getElementById('navLinks');
      if (navLinks) {
        navLinks.classList.remove('mobile-open');
        updateHamburgerIcon(false);
      }
    });
  });
}

/* ── 3. MOBILE HAMBURGER ── */
let menuOpen = false;

function updateHamburgerIcon(open) {
  const spans = document.querySelectorAll('.navbar__hamburger span');
  if (open) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', function () {
    menuOpen = !menuOpen;
    navLinks.classList.toggle('mobile-open', menuOpen);
    hamburger.setAttribute('aria-expanded', String(menuOpen));
    updateHamburgerIcon(menuOpen);
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (menuOpen && !hamburger.contains(e.target) && !navLinks.contains(e.target)) {
      menuOpen = false;
      navLinks.classList.remove('mobile-open');
      updateHamburgerIcon(false);
    }
  });
}

/* ── 4. ACTIVE NAV HIGHLIGHT ── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.navbar__links a');

  if (!sections.length || !links.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach(function (link) {
            link.classList.toggle('active', link.getAttribute('href') === '#' + id);
          });
        }
      });
    },
    { threshold: 0.4, rootMargin: '-60px 0px 0px 0px' }
  );

  sections.forEach(function (s) { observer.observe(s); });
}

/* ── 5. SCROLL ANIMATIONS (fade-in) ── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  elements.forEach(function (el) { observer.observe(el); });
}

/* ── 6. SKILL BARS ── */
function initSkillBars() {
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.skill-bar__fill').forEach(function (bar) {
            const w = bar.getAttribute('data-width');
            if (w) bar.style.width = w + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(skillsSection);
}

/* ── 7. TYPED ROLE EFFECT ── */
function initTypedEffect() {
  const el = document.getElementById('typedRole');
  if (!el) return;

  const roles = [
    'Full Stack Developer',
    'MERN Stack Engineer',
    'React.js Developer',
    'Node.js Developer',
    'Web Application Developer',
  ];

  let roleIdx = 0;
  let charIdx = 0;
  let deleting = false;
  let speed = 100;

  function type() {
    const current = roles[roleIdx];

    if (deleting) {
      el.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      speed = 45;
    } else {
      el.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      speed = 100;
    }

    if (!deleting && charIdx === current.length) {
      deleting = true;
      speed = 1800;
    } else if (deleting && charIdx === 0) {
      deleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      speed = 400;
    }

    setTimeout(type, speed);
  }

  // Small delay before starting
  setTimeout(type, 800);
}

/* ── 8. BACK TO TOP ── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', function () {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


function initContactForm() {
  /* ── CONFIG: Replace these 3 values with your EmailJS IDs ── */
  var EMAILJS_SERVICE_ID  = 'service_jako80m';   
  var EMAILJS_TEMPLATE_ID = 'template_sa2pk9h';  
  var EMAILJS_PUBLIC_KEY  = 'w6UvBaVku48NUAkMv';   
  /* ─────────────────────────────────────────────────────────── */

  // Initialise EmailJS with your public key
  if (typeof emailjs !== 'undefined') {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }

  var form      = document.getElementById('contactForm');
  var submitBtn = document.getElementById('submitBtn');
  var btnText   = document.getElementById('submitBtnText');
  var status    = document.getElementById('formStatus');

  if (!form || !submitBtn) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var firstName = document.getElementById('firstName').value.trim();
    var email     = document.getElementById('senderEmail').value.trim();
    var message   = document.getElementById('message').value.trim();

    // Validation
    if (!firstName) { showStatus('Please enter your first name.', 'error'); return; }
    if (!email)     { showStatus('Please enter your email address.', 'error'); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showStatus('Please enter a valid email address.', 'error'); return;
    }
    if (!message)   { showStatus('Please write a message.', 'error'); return; }

    // Check EmailJS is configured
    if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID') {
      showStatus(
        '⚙️ EmailJS not configured yet. See js/script.js for setup instructions.',
        'error'
      );
      return;
    }

    // Send email
    setLoading(true);
    clearStatus();

    emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form)
      .then(function () {
        setLoading(false);
        showStatus(
          '✅ Message sent! Ajinkya will reply to ' + email + ' within 24 hours.',
          'success'
        );
        form.reset();
      })
      .catch(function (err) {
        setLoading(false);
        showStatus(
          '❌ Failed to send. Please email directly: patilajinkya5101@gmail.com',
          'error'
        );
        console.error('EmailJS error:', err);
      });
  });

  function setLoading(loading) {
    submitBtn.disabled = loading;
    if (btnText) {
      btnText.textContent = loading ? 'Sending…' : 'Send Message →';
    }
  }

  function showStatus(msg, type) {
    if (!status) return;
    status.textContent = msg;
    status.className   = 'form-status form-status--' + type;
  }

  function clearStatus() {
    if (!status) return;
    status.textContent = '';
    status.className   = 'form-status';
  }
}

/* ── 10. AUTO YEAR ── */
function initYear() {
  const el = document.getElementById('currentYear');
  if (el) el.textContent = new Date().getFullYear();
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', function () {
  initNavbarScroll();
  initSmoothScroll();
  initMobileMenu();
  initActiveNav();
  initScrollAnimations();
  initSkillBars();
  initTypedEffect();
  initBackToTop();
  initContactForm();
  initYear();

  console.log('✅ Portfolio v3.0 — Scripts loaded');
});
