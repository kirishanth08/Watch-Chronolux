/**
 * Watch & Jewellery Repair Shop — Main JavaScript
 * Handles: dark mode, RTL, form validation, booking confirmation,
 * blog filters, countdown timer
 */

(function () {
  'use strict';

  /* ============================================
     DOM READY
     ============================================ */
  document.addEventListener('DOMContentLoaded', init);

  function init() {
    initThemeToggle();
    initRtlToggle();
    initAuthNavbar();
    initBookingForm();
    initContactForm();
    initBlogFilters();
    initCountdown();
  }

  /* ============================================
     DARK / LIGHT MODE TOGGLE
     ============================================ */
  function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggle');
    if (!toggleBtn) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      updateThemeIcon(toggleBtn, true);
    }

    toggleBtn.addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon(toggleBtn, false);
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon(toggleBtn, true);
      }
    });
  }

  /** Update theme toggle icon between sun and moon */
  function updateThemeIcon(btn, isDark) {
    const icon = btn.querySelector('i');
    if (!icon) return;
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  }

  /* ============================================
     LOGGED-IN NAVBAR PROFILE
     ============================================ */
  function initAuthNavbar() {
    const controls = document.querySelector('.navbar-controls');
    if (!controls || document.body.classList.contains('portal-page')) return;

    const isAdmin = localStorage.getItem('adminLoggedIn') === 'true' &&
      localStorage.getItem('adminLoggedInEmail') === 'admin@chronolux.com';
    const isCustomer = localStorage.getItem('userLoggedIn') === 'true' &&
      localStorage.getItem('userLoggedInEmail') === 'customer@chronolux.com';
    if (!isAdmin && !isCustomer) return;

    controls.querySelectorAll('a[href="login.html"], a[href="signup.html"], a[href="admin-login.html"], a[href="admin-signup.html"]').forEach(function (link) {
      link.remove();
    });

    if (controls.querySelector('.navbar-profile-icon')) return;

    const profileLink = document.createElement('a');
    const name = isAdmin ? (localStorage.getItem('adminName') || 'Operations Director') : (localStorage.getItem('userName') || 'Sofia Laurent');
    const initials = name.split(' ').map(function (part) {
      return part.charAt(0);
    }).join('').slice(0, 2).toUpperCase();

    profileLink.className = 'navbar-profile-icon';
    profileLink.href = isAdmin ? 'admin-dashboard.html' : 'user-dashboard.html';
    profileLink.setAttribute('aria-label', isAdmin ? 'Open admin dashboard' : 'Open customer dashboard');
    profileLink.innerHTML = '<span>' + initials + '</span>';
    controls.appendChild(profileLink);
  }

  /* ============================================
     RTL TOGGLE
     ============================================ */
  function initRtlToggle() {
    const toggleBtn = document.getElementById('rtlToggle');
    if (!toggleBtn) return;

    const savedDir = localStorage.getItem('direction');
    if (savedDir === 'rtl') {
      document.documentElement.setAttribute('dir', 'rtl');
      toggleBtn.setAttribute('aria-pressed', 'true');
    }

    toggleBtn.addEventListener('click', function () {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('direction', 'ltr');
        toggleBtn.setAttribute('aria-pressed', 'false');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('direction', 'rtl');
        toggleBtn.setAttribute('aria-pressed', 'true');
      }
    });
  }

  /* ============================================
     FORM VALIDATION HELPERS
     ============================================ */
  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validatePhone(phone) {
    return /^[\d\s\-+()]{7,20}$/.test(phone.trim());
  }

  function showFieldError(field, message) {
    field.classList.add('is-invalid');
    let feedback = field.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      feedback = document.createElement('div');
      feedback.className = 'invalid-feedback';
      field.parentElement.appendChild(feedback);
    }
    feedback.textContent = message;
  }

  function clearFieldError(field) {
    field.classList.remove('is-invalid');
    const feedback = field.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  }

  function validateRequiredField(field, label) {
    if (!field.value.trim()) {
      showFieldError(field, label + ' is required.');
      return false;
    }
    clearFieldError(field);
    return true;
  }

  /* ============================================
     BOOKING FORM VALIDATION & CONFIRMATION
     ============================================ */
  function initBookingForm() {
    const form = document.getElementById('bookingForm');
    if (!form) return;

    const successMsg = document.getElementById('bookingSuccess');

    /* Set minimum date to today on the date picker */
    const dateField = form.querySelector('#preferredDate');
    if (dateField) {
      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      dateField.setAttribute('min', yyyy + '-' + mm + '-' + dd);
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const fields = {
        fullName: { el: form.querySelector('#fullName'), label: 'Full name' },
        phone: { el: form.querySelector('#phone'), label: 'Phone number' },
        email: { el: form.querySelector('#email'), label: 'Email address' },
        itemType: { el: form.querySelector('#itemType'), label: 'Item type' },
        serviceRequired: { el: form.querySelector('#serviceRequired'), label: 'Service required' },
        itemBrand: { el: form.querySelector('#itemBrand'), label: 'Item brand' },
        issueDescription: { el: form.querySelector('#issueDescription'), label: 'Issue description' },
        preferredDate: { el: form.querySelector('#preferredDate'), label: 'Preferred date' },
        preferredTime: { el: form.querySelector('#preferredTime'), label: 'Preferred time slot' }
      };

      Object.keys(fields).forEach(function (key) {
        const f = fields[key];
        if (!f.el) return;
        if (!validateRequiredField(f.el, f.label)) {
          isValid = false;
        }
      });

      const emailField = fields.email.el;
      if (emailField && emailField.value.trim() && !validateEmail(emailField.value)) {
        showFieldError(emailField, 'Please enter a valid email address.');
        isValid = false;
      }

      const phoneField = fields.phone.el;
      if (phoneField && phoneField.value.trim() && !validatePhone(phoneField.value)) {
        showFieldError(phoneField, 'Please enter a valid phone number.');
        isValid = false;
      }

      const dateField = fields.preferredDate.el;
      if (dateField && dateField.value) {
        const selected = new Date(dateField.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected < today) {
          showFieldError(dateField, 'Please select a future date.');
          isValid = false;
        }
      }

      if (!isValid) return;

      form.classList.add('hidden');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.setAttribute('aria-live', 'polite');
        successMsg.focus();
      }
    });

    /* Clear errors on input */
    form.querySelectorAll('.form-control, .form-select').forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
      });
      field.addEventListener('change', function () {
        clearFieldError(field);
      });
    });
  }

  /* ============================================
     CONTACT FORM VALIDATION & CONFIRMATION
     ============================================ */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    const successMsg = document.getElementById('contactSuccess');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      const nameField = form.querySelector('#contactName');
      const emailField = form.querySelector('#contactEmail');
      const subjectField = form.querySelector('#contactSubject');
      const messageField = form.querySelector('#contactMessage');

      if (nameField && !validateRequiredField(nameField, 'Name')) isValid = false;
      if (emailField) {
        if (!validateRequiredField(emailField, 'Email')) {
          isValid = false;
        } else if (!validateEmail(emailField.value)) {
          showFieldError(emailField, 'Please enter a valid email address.');
          isValid = false;
        }
      }
      if (subjectField && !validateRequiredField(subjectField, 'Subject')) isValid = false;
      if (messageField && !validateRequiredField(messageField, 'Message')) isValid = false;

      if (!isValid) return;

      form.classList.add('hidden');
      if (successMsg) {
        successMsg.classList.add('show');
        successMsg.setAttribute('aria-live', 'polite');
      }
    });

    form.querySelectorAll('.form-control, .form-select').forEach(function (field) {
      field.addEventListener('input', function () {
        clearFieldError(field);
      });
    });
  }

  /* ============================================
     BLOG FILTER TABS
     ============================================ */
  function initBlogFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card[data-category]');
    if (!filterBtns.length || !blogCards.length) return;

    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const category = btn.getAttribute('data-filter');

        filterBtns.forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-selected', 'true');

        blogCards.forEach(function (card) {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.closest('.col-md-6, .col-lg-4').classList.remove('hidden');
          } else {
            card.closest('.col-md-6, .col-lg-4').classList.add('hidden');
          }
        });
      });
    });
  }

  /* ============================================
     COMING SOON COUNTDOWN TIMER
     ============================================ */
  function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    /* Target date: 90 days from page load for demo */
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 90);

    function updateCountdown() {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        countdownEl.innerHTML = '<p>We are now open!</p>';
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      const daysEl = document.getElementById('countDays');
      const hoursEl = document.getElementById('countHours');
      const minutesEl = document.getElementById('countMinutes');
      const secondsEl = document.getElementById('countSeconds');

      if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
      if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
      if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
      if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
  }

  // Password visibility toggle
  document.querySelectorAll(".password-toggle").forEach(function (button) {

    button.addEventListener("click", function () {

      const input = this.previousElementSibling;
      const icon = this.querySelector("i");

      if (input.type === "password") {

        input.type = "text";

        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");

      } else {

        input.type = "password";

        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");

      }

    });

  });
  

})();
