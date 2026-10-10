/* ============================================================
   KoredeSec portfolio
   - Theme toggle (light / dark, remembers choice)
   - Mobile menu + current-section highlight in the nav
   - Security Posture Explorer (thesis)
   - Copy email
   - Highlighter on the hero line
   ============================================================ */

(function () {
  'use strict';

  var root = document.documentElement;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- Theme ----
  var themeSwitch = document.getElementById('theme-switch');
  var systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function theme() {
    var t = root.getAttribute('data-theme');
    if (t === 'light' || t === 'dark') return t;
    return systemDark.matches ? 'dark' : 'light';
  }
  function labelTheme() {
    if (themeSwitch) themeSwitch.setAttribute('aria-label', theme() === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }
  if (themeSwitch) {
    labelTheme();
    themeSwitch.addEventListener('click', function () {
      var next = theme() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('koredesec-theme', next); } catch (e) { /* storage blocked */ }
      labelTheme();
    });
    systemDark.addEventListener('change', labelTheme);
  }

  // ---- Mobile menu ----
  var menuBtn = document.getElementById('menu-btn');
  var nav = document.getElementById('nav');

  function setMenu(open) {
    if (!menuBtn || !nav) return;
    nav.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.textContent = open ? 'Close' : 'Menu';
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener('click', function () { setMenu(menuBtn.getAttribute('aria-expanded') !== 'true'); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menuBtn.getAttribute('aria-expanded') === 'true') { setMenu(false); menuBtn.focus(); }
    });
    window.matchMedia('(min-width: 901px)').addEventListener('change', function (mq) { if (mq.matches) setMenu(false); });
  }

  // ---- Current section in nav ----
  var navLinks = document.querySelectorAll('.nav a[href^="#"]');
  if ('IntersectionObserver' in window && navLinks.length) {
    var linkFor = {};
    navLinks.forEach(function (a) { linkFor[a.getAttribute('href').slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (a) { a.removeAttribute('aria-current'); });
        var link = linkFor[entry.target.id];
        if (link) link.setAttribute('aria-current', 'true');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    Object.keys(linkFor).forEach(function (id) {
      var s = document.getElementById(id);
      if (s) spy.observe(s);
    });
  }

  // ---- Security Posture Explorer ----
  var explorer = document.getElementById('explorer');
  var btnHarden = document.getElementById('btn-harden');
  var btnReset = document.getElementById('btn-reset');
  if (explorer && btnHarden && btnReset) {
    var BASELINE = 67.09;
    var HARDENED = 89.60;
    var scoreValue = document.getElementById('sps-value');
    var meter = document.getElementById('sps-meter');
    var scoreLabel = document.getElementById('score-label');
    var vulnStat = document.getElementById('vuln-stat');
    var ctrls = explorer.querySelectorAll('.ctrls li');
    var timers = [];

    function animateScore(from, to) {
      if (reduceMotion) { scoreValue.textContent = to.toFixed(2); return; }
      var t0 = performance.now();
      (function frame(now) {
        var t = Math.min((now - t0) / 1000, 1);
        scoreValue.textContent = (from + (to - from) * (1 - Math.pow(1 - t, 3))).toFixed(2);
        if (t < 1) requestAnimationFrame(frame);
      })(t0);
    }

    function setState(hardened) {
      explorer.setAttribute('data-state', hardened ? 'hardened' : 'baseline');
      btnHarden.disabled = hardened;
      btnReset.disabled = !hardened;
      meter.style.setProperty('--v', hardened ? HARDENED : BASELINE);
      animateScore(hardened ? BASELINE : HARDENED, hardened ? HARDENED : BASELINE);
      scoreLabel.textContent = hardened ? 'Hardened Security Posture Score' : 'Baseline Security Posture Score';
      vulnStat.textContent = hardened ? '100% vulnerability remediation' : 'Vulnerabilities present across 3 layers';

      timers.forEach(clearTimeout);
      timers = [];
      ctrls.forEach(function (li, i) {
        if (hardened && !reduceMotion) {
          timers.push(setTimeout(function () { li.classList.add('is-on'); }, 70 * i));
        } else {
          li.classList.toggle('is-on', hardened);
        }
      });
      (hardened ? btnReset : btnHarden).focus();
    }

    btnHarden.addEventListener('click', function () { setState(true); });
    btnReset.addEventListener('click', function () { setState(false); });
  }

  // ---- Copy email ----
  var copyBtn = document.getElementById('copy-btn');
  var copyStatus = document.getElementById('copy-status');

  function copied() {
    copyBtn.classList.add('is-copied');
    copyBtn.textContent = 'Copied';
    if (copyStatus) copyStatus.textContent = 'Email address copied to clipboard';
    setTimeout(function () {
      copyBtn.classList.remove('is-copied');
      copyBtn.textContent = 'Copy';
      if (copyStatus) copyStatus.textContent = '';
    }, 2000);
  }

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { if (document.execCommand('copy')) copied(); } catch (e) { /* give up quietly */ }
    document.body.removeChild(ta);
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      var text = copyBtn.getAttribute('data-copy');
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(copied, function () { legacyCopy(text); });
      } else {
        legacyCopy(text);
      }
    });
  }

  // ---- Highlighter ----
  requestAnimationFrame(function () {
    document.querySelectorAll('mark').forEach(function (m) { m.classList.add('is-lit'); });
  });
})();
