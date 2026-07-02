document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
  }

  const savedDir = localStorage.getItem('direction');
  if (savedDir === 'rtl') {
    document.documentElement.setAttribute('dir', 'rtl');
  }

  const userName = localStorage.getItem('userName') || 'Sofia Laurent';
  const userEmail = localStorage.getItem('userEmail') || 'sofia@example.com';

  document.querySelectorAll('[data-client-name]').forEach((item) => {
    item.textContent = userName;
  });
  document.querySelectorAll('[data-client-email]').forEach((item) => {
    item.textContent = userEmail;
    if (item.tagName === 'INPUT') item.value = userEmail;
  });
  document.querySelectorAll('[data-client-initials]').forEach((item) => {
    item.textContent = userName.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2).toUpperCase();
  });
  document.querySelectorAll('.client-profile-chip').forEach((item) => {
    item.setAttribute('aria-label', 'Open customer profile');
    item.setAttribute('title', 'Customer profile');
  });

  document.querySelectorAll('[data-client-theme]').forEach((button) => {
    updateThemeButton(button);
    button.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      document.querySelectorAll('[data-client-theme]').forEach(updateThemeButton);
    });
  });

  document.querySelectorAll('[data-client-rtl]').forEach((button) => {
    button.setAttribute('aria-pressed', String(document.documentElement.getAttribute('dir') === 'rtl'));
    button.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.removeAttribute('dir');
        localStorage.setItem('direction', 'ltr');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('direction', 'rtl');
      }
      document.querySelectorAll('[data-client-rtl]').forEach((item) => {
        item.setAttribute('aria-pressed', String(!isRtl));
      });
    });
  });

  document.querySelectorAll('[data-client-search]').forEach((input) => {
    const rows = document.querySelectorAll(input.dataset.clientSearch);
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      rows.forEach((row) => {
        row.classList.toggle('hidden', query && !row.textContent.toLowerCase().includes(query));
      });
    });
  });

  document.querySelectorAll('[data-client-action]').forEach((button) => {
    button.addEventListener('click', () => showClientNotice(button.dataset.clientAction));
  });

  document.querySelectorAll('[data-client-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach((field) => {
        const filled = field.value.trim();
        field.classList.toggle('is-invalid', !filled);
        if (!filled) valid = false;
      });
      if (!valid) {
        showClientNotice('Please complete the required fields');
        return;
      }
      showClientNotice(form.dataset.clientForm || 'Saved');
    });
  });

  function updateThemeButton(button) {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const icon = button.querySelector('i');
    const label = button.querySelector('span');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  }

  function showClientNotice(message) {
    let notice = document.querySelector('.client-toast');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'client-toast';
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.add('show');
    window.clearTimeout(notice.hideTimer);
    notice.hideTimer = window.setTimeout(() => notice.classList.remove('show'), 2200);
  }
});
