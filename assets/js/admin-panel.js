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

  const adminName = localStorage.getItem('adminName') || 'Operations Director';
  document.querySelectorAll('[data-admin-name]').forEach((item) => {
    item.textContent = adminName;
  });
  document.querySelectorAll('[data-admin-initials]').forEach((item) => {
    item.textContent = adminName.split(' ').map((part) => part.charAt(0)).join('').slice(0, 2).toUpperCase();
  });
  document.querySelectorAll('.admin-profile-chip').forEach((item) => {
    item.setAttribute('aria-label', 'Open admin settings');
    item.setAttribute('title', 'Admin profile');
  });

  document.querySelectorAll('[data-admin-theme]').forEach((button) => {
    updateAdminThemeButton(button);
    button.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
      }
      document.querySelectorAll('[data-admin-theme]').forEach(updateAdminThemeButton);
    });
  });

  document.querySelectorAll('[data-admin-rtl]').forEach((button) => {
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
      document.querySelectorAll('[data-admin-rtl]').forEach((item) => {
        item.setAttribute('aria-pressed', String(!isRtl));
      });
    });
  });

  const searchInputs = document.querySelectorAll('[data-admin-search]');
  searchInputs.forEach((input) => {
    const targetSelector = input.dataset.adminSearch;
    const rows = document.querySelectorAll(targetSelector);
    input.addEventListener('input', () => {
      const query = input.value.trim().toLowerCase();
      rows.forEach((row) => {
        row.classList.toggle('hidden', query && !row.textContent.toLowerCase().includes(query));
      });
    });
  });

  const filters = document.querySelectorAll('[data-admin-filter]');
  filters.forEach((filter) => {
    const targetSelector = filter.dataset.adminFilter;
    filter.addEventListener('change', () => {
      const value = filter.value;
      document.querySelectorAll(targetSelector).forEach((row) => {
        const status = row.dataset.status || '';
        row.classList.toggle('hidden', value !== 'all' && status !== value);
      });
    });
  });

  document.querySelectorAll('[data-status-select]').forEach((select) => {
    select.addEventListener('change', () => {
      const row = select.closest('[data-status]');
      if (!row) return;
      row.dataset.status = select.value;
      const badge = row.querySelector('.admin-badge');
      if (badge) {
        badge.className = 'admin-badge ' + select.value;
        badge.textContent = select.options[select.selectedIndex].text;
      }
      showAdminNotice('Status updated');
    });
  });

  document.querySelectorAll('[data-admin-action]').forEach((button) => {
    button.addEventListener('click', () => {
      showAdminNotice(button.dataset.adminAction);
    });
  });

  document.querySelectorAll('[data-admin-form]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const required = form.querySelectorAll('[required]');
      let valid = true;
      required.forEach((field) => {
        if (!field.value.trim()) {
          field.classList.add('is-invalid');
          valid = false;
        } else {
          field.classList.remove('is-invalid');
        }
      });
      if (!valid) {
        showAdminNotice('Please complete the required fields');
        return;
      }
      showAdminNotice(form.dataset.adminForm || 'Saved');
      form.reset();
    });
  });

  function showAdminNotice(message) {
    let notice = document.querySelector('.admin-toast');
    if (!notice) {
      notice = document.createElement('div');
      notice.className = 'admin-toast';
      document.body.appendChild(notice);
    }
    notice.textContent = message;
    notice.classList.add('show');
    window.clearTimeout(notice.hideTimer);
    notice.hideTimer = window.setTimeout(() => notice.classList.remove('show'), 2200);
  }

  function updateAdminThemeButton(button) {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    const icon = button.querySelector('i');
    const label = button.querySelector('span');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = isDark ? 'Light' : 'Dark';
  }
});
