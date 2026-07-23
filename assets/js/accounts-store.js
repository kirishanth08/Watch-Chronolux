/**
 * ChronoLux — Customer Account Store
 * --------------------------------------------------
 * This template ships without a backend/database, so there is nowhere
 * real to persist accounts. To make "sign up, then log in" behave
 * correctly in the browser, registered accounts are kept in
 * localStorage under CHRONOLUX_ACCOUNTS_KEY.
 *
 * IMPORTANT: This is a front-end demo only. Passwords are lightly
 * obfuscated (not encrypted) before storage purely so they aren't sitting
 * around as plain text in devtools. This is NOT secure storage. Before
 * going live, replace this entire file with real calls to a backend
 * authentication API (e.g. POST /api/signup, POST /api/login) that
 * hashes passwords server-side and issues real session tokens.
 */
(function (window) {
  'use strict';

  var CHRONOLUX_ACCOUNTS_KEY = 'chronoluxAccounts';
  var CHRONOLUX_ADMIN_ACCOUNTS_KEY = 'chronoluxAdminAccounts';

  function obfuscate(value) {
    // Simple reversible obfuscation (NOT encryption/hashing) — good enough
    // to avoid storing raw plain-text passwords in this front-end-only demo.
    try {
      return window.btoa(unescape(encodeURIComponent('cl::' + value)));
    } catch (e) {
      return value;
    }
  }

  function deobfuscate(value) {
    try {
      var decoded = decodeURIComponent(escape(window.atob(value)));
      return decoded.indexOf('cl::') === 0 ? decoded.slice(4) : decoded;
    } catch (e) {
      return '';
    }
  }

  function normalizeEmail(email) {
    return String(email || '').trim().toLowerCase();
  }

  function getAccounts(storageKey) {
    try {
      var raw = window.localStorage.getItem(storageKey || CHRONOLUX_ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveAccounts(accounts, storageKey) {
    window.localStorage.setItem(storageKey || CHRONOLUX_ACCOUNTS_KEY, JSON.stringify(accounts));
  }

  function accountExists(email) {
    var accounts = getAccounts(CHRONOLUX_ACCOUNTS_KEY);
    return Object.prototype.hasOwnProperty.call(accounts, normalizeEmail(email));
  }

  /**
   * Registers a new account. Returns { ok: true } on success, or
   * { ok: false, reason: 'exists' } if an account already exists.
   */
  function registerAccount(details) {
    var email = normalizeEmail(details.email);
    if (!email) return { ok: false, reason: 'invalid' };

    var accounts = getAccounts(CHRONOLUX_ACCOUNTS_KEY);
    if (Object.prototype.hasOwnProperty.call(accounts, email)) {
      return { ok: false, reason: 'exists' };
    }

    accounts[email] = {
      firstName: details.firstName || '',
      lastName: details.lastName || '',
      name: [details.firstName, details.lastName].filter(Boolean).join(' ') || 'ChronoLux Customer',
      phone: details.phone || '',
      password: obfuscate(details.password || ''),
      createdAt: new Date().toISOString()
    };

    saveAccounts(accounts, CHRONOLUX_ACCOUNTS_KEY);
    return { ok: true };
  }

  /**
   * Verifies login credentials against registered accounts.
   * Returns { ok: true, account } on success, or
   * { ok: false, reason: 'not-found' | 'wrong-password' }.
   */
  function verifyAccount(email, password) {
    var accounts = getAccounts(CHRONOLUX_ACCOUNTS_KEY);
    var normalized = normalizeEmail(email);
    var account = accounts[normalized];

    if (!account) {
      return { ok: false, reason: 'not-found' };
    }

    if (deobfuscate(account.password) !== password) {
      return { ok: false, reason: 'wrong-password' };
    }

    return { ok: true, account: account };
  }

  /**
   * Used by the demo Google/Apple buttons: creates the account if it
   * doesn't exist yet, so the "must sign up first" rule still applies
   * consistently, then returns the account record.
   */
  function upsertSocialAccount(email, name) {
    var normalized = normalizeEmail(email);
    var accounts = getAccounts(CHRONOLUX_ACCOUNTS_KEY);
    if (!accounts[normalized]) {
      accounts[normalized] = {
        firstName: name || 'ChronoLux',
        lastName: 'Customer',
        name: name || 'ChronoLux Customer',
        phone: '',
        password: obfuscate(''),
        createdAt: new Date().toISOString()
      };
      saveAccounts(accounts, CHRONOLUX_ACCOUNTS_KEY);
    }
    return accounts[normalized];
  }

  /* ------------------------------------------------------------------
   * Admin accounts
   * Kept in a separate localStorage bucket from customer accounts so
   * the two pools never collide, and gated behind an "admin access
   * code" on sign-up (see pages/admin-signup.html) — a stand-in for
   * the real-world rule that admin accounts are provisioned by staff,
   * not opened to the public. Swap for a real backend before going live.
   * ------------------------------------------------------------------ */

  function adminAccountExists(email) {
    var accounts = getAccounts(CHRONOLUX_ADMIN_ACCOUNTS_KEY);
    return Object.prototype.hasOwnProperty.call(accounts, normalizeEmail(email));
  }

  function registerAdminAccount(details) {
    var email = normalizeEmail(details.email);
    if (!email) return { ok: false, reason: 'invalid' };

    var accounts = getAccounts(CHRONOLUX_ADMIN_ACCOUNTS_KEY);
    if (Object.prototype.hasOwnProperty.call(accounts, email)) {
      return { ok: false, reason: 'exists' };
    }

    accounts[email] = {
      firstName: details.firstName || '',
      lastName: details.lastName || '',
      name: [details.firstName, details.lastName].filter(Boolean).join(' ') || 'ChronoLux Admin',
      role: details.role || 'Administrator',
      phone: details.phone || '',
      password: obfuscate(details.password || ''),
      createdAt: new Date().toISOString()
    };

    saveAccounts(accounts, CHRONOLUX_ADMIN_ACCOUNTS_KEY);
    return { ok: true };
  }

  function verifyAdminAccount(email, password) {
    var accounts = getAccounts(CHRONOLUX_ADMIN_ACCOUNTS_KEY);
    var normalized = normalizeEmail(email);
    var account = accounts[normalized];

    if (!account) {
      return { ok: false, reason: 'not-found' };
    }

    if (deobfuscate(account.password) !== password) {
      return { ok: false, reason: 'wrong-password' };
    }

    return { ok: true, account: account };
  }

  window.ChronoluxAccounts = {
    accountExists: accountExists,
    registerAccount: registerAccount,
    verifyAccount: verifyAccount,
    upsertSocialAccount: upsertSocialAccount,
    adminAccountExists: adminAccountExists,
    registerAdminAccount: registerAdminAccount,
    verifyAdminAccount: verifyAdminAccount
  };
})(window);
