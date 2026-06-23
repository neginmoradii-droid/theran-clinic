/* THERAN — app.js
   Sticky nav · mobile menu · scroll reveals · booking modal · treatments filter */
(function () {
  'use strict';

  /* Sticky nav */
  const nav = document.getElementById('nav');
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > 40) nav.classList.add('nav--scrolled');
    else nav.classList.remove('nav--scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Mobile menu */
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  function closeMenu() {
    if (!menu) return;
    menu.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      const open = menu.classList.toggle('open');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    menu.querySelectorAll('a:not([data-open-modal])').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  /* Scroll reveal */
  const reveals = document.querySelectorAll('.reveal');
  function revealAll() {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }
  if ('IntersectionObserver' in window && reveals.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    setTimeout(revealAll, 2400);
  } else {
    revealAll();
  }

  /* Booking modal */
  const modal = document.getElementById('modal');
  const formView = document.getElementById('formView');
  const successView = document.getElementById('successView');
  const form = document.getElementById('bookingForm');
  let lastFocus = null;

  function openModal(e) {
    if (e) e.preventDefault();
    if (!modal) return;
    closeMenu();
    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    const first = modal.querySelector('input, select');
    if (first) setTimeout(function () { first.focus(); }, 120);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (lastFocus) lastFocus.focus();
  }

  document.querySelectorAll('[data-open-modal]').forEach(function (b) {
    b.addEventListener('click', openModal);
  });
  document.querySelectorAll('[data-close-modal]').forEach(function (b) {
    b.addEventListener('click', closeModal);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) closeModal();
  });

  /* Form validation */
  function setError(field, on) {
    if (!field) return;
    field.classList.toggle('error', on);
  }
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let ok = true;
      const nombre = form.name, telefono = form.phone, email = form.email, interes = form.interest;

      const nValid = nombre.value.trim().length > 1;
      setError(nombre.closest('.field'), !nValid); if (!nValid) ok = false;

      const tValid = telefono.value.trim().length >= 6;
      setError(telefono.closest('.field'), !tValid); if (!tValid) ok = false;

      const eValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
      setError(email.closest('.field'), !eValid); if (!eValid) ok = false;

      const iValid = interes.value !== '';
      setError(interes.closest('.field'), !iValid); if (!iValid) ok = false;

      if (!ok) return;

      if (formView) formView.style.display = 'none';
      if (successView) successView.classList.add('show');
    });

    form.querySelectorAll('input, select').forEach(function (el) {
      el.addEventListener('input', function () { setError(el.closest('.field'), false); });
    });
  }

  /* Treatments page: category filter */
  const filterBtns = document.querySelectorAll('[data-filter]');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const target = btn.getAttribute('data-filter');
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        document.querySelectorAll('[data-group]').forEach(function (sec) {
          const show = target === 'all' || sec.getAttribute('data-group') === target;
          sec.style.display = show ? '' : 'none';
        });
        document.querySelectorAll('[data-group]:not([style*="none"]) .reveal').forEach(function (el) {
          el.classList.add('in');
        });
      });
    });
  }
})();
