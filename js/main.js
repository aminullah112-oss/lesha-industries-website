// Lesh Industries — site behaviour: mobile nav, mega menu (touch), hero carousel.
document.addEventListener('DOMContentLoaded', function () {

  /* ---------------- Mobile nav toggle ---------------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  var header = document.querySelector('.site-header');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('nav-open');
      toggle.classList.toggle('is-active', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('nav-locked', open);
    });
  }

  /* ---------------- Mega menu: tap-to-open on touch/mobile ---------------- */
  document.querySelectorAll('.has-mega > .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 860) {
        var parent = link.parentElement;
        var isOpen = parent.classList.contains('mega-open');
        document.querySelectorAll('.has-mega').forEach(function (li) { li.classList.remove('mega-open'); });
        if (!isOpen) {
          e.preventDefault();
          parent.classList.add('mega-open');
        }
      }
    });
  });

  /* ---------------- Hero carousel ---------------- */
  var hero = document.querySelector('.hero-slides');
  if (hero) {
    var slides = Array.prototype.slice.call(hero.querySelectorAll('.hero-slide'));
    var dotsWrap = document.querySelector('.hero-dots');
    var current = 0;
    var timer;

    function go(index) {
      slides[current].classList.remove('active');
      if (dotsWrap) dotsWrap.children[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      if (dotsWrap) dotsWrap.children[current].classList.add('active');
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', function () { go(i); resetTimer(); });
        dotsWrap.appendChild(dot);
      });
    }

    var prevBtn = document.querySelector('.hero-nav.prev');
    var nextBtn = document.querySelector('.hero-nav.next');
    if (prevBtn) prevBtn.addEventListener('click', function () { go(current - 1); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { go(current + 1); resetTimer(); });

    function resetTimer() {
      clearInterval(timer);
      timer = setInterval(function () { go(current + 1); }, 6000);
    }
    if (slides.length > 1) resetTimer();
  }

  /* ---------------- Product category filter (products page) ---------------- */
  var jumpLinks = document.querySelectorAll('.cat-jump a');
  if (jumpLinks.length) {
    jumpLinks.forEach(function (a) {
      a.addEventListener('click', function () {
        jumpLinks.forEach(function (l) { l.classList.remove('active'); });
        a.classList.add('active');
      });
    });
  }

  /* ---------------- Header shadow on scroll ---------------- */
  if (header) {
    var onScroll = function () {
      header.classList.toggle('scrolled', window.scrollY > 12);
    };
    document.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------------- Footer year ---------------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
