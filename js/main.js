/* ============================================================
   KoredeSec Portfolio — Main JavaScript
   - Page entrance (per-page load-in)
   - Nav: scroll border + hide-on-scroll-down/show-on-scroll-up
   - Mobile nav toggle
   - Dark mode toggle
   - Scroll reveals: varied techniques + staggered lists + count-ups
   - Security Posture Explorer (thesis interactive)
   - Copy-to-clipboard
   ============================================================ */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  // ---- Page entrance ----
  const body = document.body;
  if (body.classList.contains('pre-hero')) {
    if (prefersReducedMotion) {
      body.classList.remove('pre-hero');
      body.classList.add('hero-in');
    } else {
      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          body.classList.remove('pre-hero');
          body.classList.add('hero-in');
        });
      });
    }
  }

  // ---- Nav scroll border + hide/show ----
  const nav = document.getElementById('site-nav');
  let lastScrollY = window.scrollY;
  let navMenuOpen = false;

  function handleNavScroll() {
    if (!nav) return;
    const y = window.scrollY;

    if (y > 8) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    if (!prefersReducedMotion && !navMenuOpen) {
      if (y > 140 && y > lastScrollY) {
        nav.classList.add('nav-hidden');
      } else {
        nav.classList.remove('nav-hidden');
      }
    } else {
      nav.classList.remove('nav-hidden');
    }

    lastScrollY = y;
  }

  window.addEventListener('scroll', handleNavScroll, { passive: true });
  handleNavScroll();

  // ---- Mobile nav toggle ----
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      navMenuOpen = isOpen;
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    });

    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        navMenuOpen = false;
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation menu');
      });
    });
  }

  // ---- Dark mode toggle ----
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const rootEl = document.documentElement;

  function currentTheme() {
    return rootEl.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }

  function updateThemeUI() {
    if (!themeToggle || !themeLabel) return;
    const dark = currentTheme() === 'dark';
    themeLabel.textContent = dark ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    themeToggle.setAttribute('aria-pressed', String(dark));
  }

  function setTheme(next) {
    rootEl.setAttribute('data-theme', next);
    try {
      localStorage.setItem('koredesec-theme', next);
    } catch (e) {
      // storage unavailable — theme still applies for this session
    }
    updateThemeUI();
  }

  if (themeToggle) {
    updateThemeUI();
    themeToggle.addEventListener('click', function () {
      setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    });
  }

  // ---- Scroll reveals ----
  const revealEls = document.querySelectorAll('[data-reveal]');
  const hasIo = 'IntersectionObserver' in window;

  function setRevealed(cluster) {
    cluster.forEach(function (el) {
      el.classList.add('js-seen');
    });
  }

  function armStagger(parent) {
    const items = Array.prototype.slice.call(parent.querySelectorAll('.stagger-item'));
    if (!items.length) return;
    items.forEach(function (item, index) {
      item.classList.add('js-seen');
      if (!prefersReducedMotion) {
        item.style.transitionDelay = String(60 + index * 90) + 'ms';
      }
    });
    setTimeout(function () {
      items.forEach(function (item) {
        item.style.transitionDelay = '';
      });
    }, (items.length * 90) + 900);
  }

  function revealNow(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      if (el.getAttribute('data-reveal') === 'stagger') {
        el.classList.add('js-seen');
        window.requestAnimationFrame(function () {
          armStagger(el);
        });
      } else {
        el.classList.add('js-seen');
      }
      revealObserver.unobserve(el);
    });
  }

  let revealObserver = null;

  if (!prefersReducedMotion && hasIo && revealEls.length) {
    revealObserver = new IntersectionObserver(revealNow, {
      threshold: 0.02,
      rootMargin: '0px 0px -4% 0px'
    });
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else if (revealEls.length) {
    revealEls.forEach(function (el) {
      el.classList.add('js-seen');
    });
  }

  // ---- Count-up stats ----
  const counters = document.querySelectorAll('.counter');

  function animateCounter(el, from, to, duration, suffixEl) {
    const start = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(from + (to - from) * eased).toLocaleString();
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = to.toLocaleString();
      }
    }

    window.requestAnimationFrame(step);
  }

  function setCounterFinal(el) {
    const to = parseInt(el.getAttribute('data-count'), 10);
    if (!Number.isNaN(to)) {
      el.textContent = Math.round(to).toLocaleString();
    }
  }

  function revealCounter(entry) {
    const el = entry.target;
    if (prefersReducedMotion) {
      setCounterFinal(el);
    } else {
      const from = parseInt(el.getAttribute('data-from') || '0', 10);
      const to = parseInt(el.getAttribute('data-count'), 10);
      const duration = 1100;
      animateCounter(el, from, to, duration);
    }
    counterObserver.unobserve(el);
  }

  if (counters.length) {
    if (!prefersReducedMotion && hasIo) {
      const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(revealCounter);
      }, { threshold: 0.5 });
      counters.forEach(function (el) {
        counterObserver.observe(el);
      });
    } else {
      counters.forEach(setCounterFinal);
    }
  }

  // ---- Security Posture Explorer ----
  const btnHarden = document.getElementById('btn-harden');
  const btnReset = document.getElementById('btn-reset');
  const postureBar = document.getElementById('posture-bar');
  const scoreValue = document.getElementById('score-value');
  const scoreLabel = document.getElementById('score-label');
  const vulnStat = document.getElementById('vuln-stat');
  const controlItems = document.querySelectorAll('.control-item');

  const BASELINE_SCORE = 67.09;
  const HARDENED_SCORE = 89.6;
  let isHardened = false;

  function applyHardening() {
    if (isHardened || !postureBar || !scoreValue) return;
    isHardened = true;

    btnHarden.disabled = true;
    btnReset.disabled = false;

    postureBar.style.setProperty('--score', String(HARDENED_SCORE));
    animateScore(BASELINE_SCORE, HARDENED_SCORE);

    scoreLabel.textContent = 'Hardened Security Posture Score';
    vulnStat.textContent = '100% vulnerability remediation';
    vulnStat.classList.add('active');

    controlItems.forEach(function (item, index) {
      if (prefersReducedMotion) {
        item.classList.add('active');
      } else {
        setTimeout(function () {
          item.classList.add('active');
        }, 60 + index * 70);
      }
    });
  }

  function resetToBaseline() {
    if (!isHardened || !postureBar || !scoreValue) return;
    isHardened = false;

    btnHarden.disabled = false;
    btnReset.disabled = true;

    postureBar.style.setProperty('--score', String(BASELINE_SCORE));
    animateScore(HARDENED_SCORE, BASELINE_SCORE);

    scoreLabel.textContent = 'Baseline Security Posture Score';
    vulnStat.textContent = 'Vulnerabilities present across 3 layers';
    vulnStat.classList.remove('active');

    controlItems.forEach(function (item) {
      item.classList.remove('active');
    });
  }

  function animateScore(from, to) {
    if (prefersReducedMotion) {
      scoreValue.textContent = to.toFixed(2);
      return;
    }

    const duration = 1100;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = from + (to - from) * eased;
      scoreValue.textContent = current.toFixed(2);

      if (progress < 1) {
        window.requestAnimationFrame(update);
      }
    }

    window.requestAnimationFrame(update);
  }

  if (btnHarden) {
    btnHarden.addEventListener('click', applyHardening);
  }

  if (btnReset) {
    btnReset.addEventListener('click', resetToBaseline);
  }

  // ---- Copy to Clipboard ----
  const btnCopy = document.getElementById('btn-copy');

  function showCopied() {
    btnCopy.textContent = 'Copied';
    btnCopy.classList.add('copied');
    setTimeout(function () {
      btnCopy.textContent = 'Copy';
      btnCopy.classList.remove('copied');
    }, 2000);
  }

  function fallbackCopy(email) {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showCopied();
    } catch (e) {
      // silently fail
    }
    document.body.removeChild(textarea);
  }

  if (btnCopy) {
    btnCopy.addEventListener('click', function () {
      const email = btnCopy.getAttribute('data-email');
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(function () {
          fallbackCopy(email);
        });
      } else {
        fallbackCopy(email);
      }
    });
  }

})();