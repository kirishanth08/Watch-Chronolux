(function () {
  const AUTH_KEYS = [
    'userLoggedIn',
    'userEmail',
    'userLoggedInEmail',
    'userName',
    'adminLoggedIn',
    'adminEmail',
    'adminLoggedInEmail',
    'adminName'
  ];
  const DEMO_AUTH = {
    userLoggedIn: {
      emailKeys: ['userLoggedInEmail', 'userEmail']
    },
    adminLoggedIn: {
      emailKeys: ['adminLoggedInEmail', 'adminEmail']
    }
  };

  enforcePortalAccess();

  window.addEventListener('pageshow', enforcePortalAccess);
  window.addEventListener('storage', enforcePortalAccess);

  document.addEventListener('DOMContentLoaded', () => {
    initPortalPreferences();
    enforcePortalAccess();

    const sidebar = document.querySelector('.portal-sidebar');
    const toggle = document.querySelector('.sidebar-toggle');

    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
      });
    }

    document.querySelectorAll('.faq-item').forEach((item) => {
      item.querySelector('.faq-question')?.addEventListener('click', () => {
        item.classList.toggle('active');
      });
    });

    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.dataset.target;
        document.querySelectorAll('.tab-panel').forEach((panel) => panel.classList.remove('active'));
        document.querySelectorAll('.tab-btn').forEach((tab) => tab.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector(target)?.classList.add('active');
      });
    });

    const forms = document.querySelectorAll('.portal-form');
    forms.forEach((form) => {
      form.addEventListener('submit', (event) => {
        const required = form.querySelectorAll('[required]');
        let valid = true;
        required.forEach((field) => {
          if (!field.value.trim()) {
            valid = false;
            field.classList.add('is-invalid');
          } else {
            field.classList.remove('is-invalid');
          }
        });
        if (!valid) {
          event.preventDefault();
          alert('Please complete all required fields before submitting.');
        }
      });
    });

    const fileInput = document.querySelector('#imageUpload');
    const preview = document.querySelector('#imagePreview');
    if (fileInput && preview) {
      fileInput.addEventListener('change', (event) => {
        const [file] = event.target.files || [];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          preview.innerHTML = `<img src="${reader.result}" alt="Preview" class="img-fluid rounded mt-2">`;
        };
        reader.readAsDataURL(file);
      });
    }

    document.querySelectorAll('a').forEach((link) => {
      if (!link.querySelector('.fa-sign-out-alt')) return;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        clearPortalAuth();
        window.location.replace(link.getAttribute('href') || 'login.html');
      });
    });
  });

  function getPortalAuthTarget() {
    const body = document.body;
    if (!body) return null;
    if (body.classList.contains('admin-page')) {
      return { key: 'adminLoggedIn', login: 'login.html#admin' };
    }
    if (body.classList.contains('client-page')) {
      return { key: 'userLoggedIn', login: 'login.html' };
    }
    return null;
  }

  function enforcePortalAccess() {
    const target = getPortalAuthTarget();
    if (!target) return;
    if (!hasValidPortalAuth(target.key)) {
      window.location.replace(target.login);
    }
  }

  function hasValidPortalAuth(key) {
    const account = DEMO_AUTH[key];
    if (!account || localStorage.getItem(key) !== 'true') return false;
    // Session is considered valid once the login flow has stored a
    // matching email under any of this role's expected keys. There is no
    // hardcoded credential here — actual authentication must be enforced
    // by a real backend before this template is used in production.
    return account.emailKeys.some((emailKey) => Boolean(localStorage.getItem(emailKey)));
  }

  function clearPortalAuth() {
    AUTH_KEYS.forEach((key) => localStorage.removeItem(key));
    sessionStorage.removeItem('loginReturnTo');
  }
})();

function initPortalPreferences() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark' || savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', savedTheme);
  }

  const savedDir = localStorage.getItem('direction');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.removeAttribute('dir');
  }

  const themeButtons = document.querySelectorAll('[data-portal-theme]');
  themeButtons.forEach((button) => {
    updatePortalThemeButton(button);
    button.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      themeButtons.forEach(updatePortalThemeButton);
    });
  });

  const rtlButtons = document.querySelectorAll('[data-portal-rtl]');
  rtlButtons.forEach((button) => {
    button.setAttribute('aria-pressed', document.documentElement.getAttribute('dir') === 'rtl' ? 'true' : 'false');
    button.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('direction', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('direction', 'rtl');
      }
      rtlButtons.forEach((item) => {
        item.setAttribute('aria-pressed', document.documentElement.getAttribute('dir') === 'rtl' ? 'true' : 'false');
      });
    });
  });

  const profileNames = document.querySelectorAll('[data-user-name]');
  const userName = localStorage.getItem('userName') || 'Sofia Laurent';
  profileNames.forEach((item) => {
    item.textContent = userName;
  });
}

function updatePortalThemeButton(button) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const icon = button.querySelector('i');
  const label = button.querySelector('span');
  if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  if (label) label.textContent = isDark ? 'Light' : 'Dark';
  button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}
