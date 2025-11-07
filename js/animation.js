(() => {
  "use strict";

  /****************************************
   * HELPERS
   ****************************************/
  function setInit(el, dy = 30) {
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = `translateY(${dy}px)`;
    el.style.willChange = "opacity, transform";
  }

  function setShow(el, t = 600) {
    if (!el) return;
    el.style.transition = `opacity ${t}ms ease, transform ${t}ms ease`;
    requestAnimationFrame(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    });
  }

  function animateCounter(el, duration = 1200) {
    if (!el) return;
    const original = el.textContent.trim();
    const match = original.match(/-?\d+(\.\d+)?/);
    if (!match) return;
    const num = parseFloat(match[0]);
    if (isNaN(num)) return;

    const prefix = original.slice(0, match.index);
    const suffix = original.slice(match.index + match[0].length);

    const startTS = performance.now();
    function tick(now) {
      const p = Math.min((now - startTS) / duration, 1);
      el.textContent = `${prefix}${Math.floor(p * num)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function animateBar(block) {
    if (!block) return;
    const body = block.querySelector(".portfolio-blocks__item-body");
    const line = block.querySelector(".line");
    const countEl = block.querySelector(".portfolio-blocks__item-count");
    if (!body || !line || !countEl) return;

    const percent =
      parseFloat(countEl.textContent.replace(/[^0-9.]/g, "")) || 0;
    const px = (percent / 100) * body.clientWidth;

    line.style.width = "0px";
    requestAnimationFrame(() => {
      line.style.transition = "width 1200ms cubic-bezier(0.25, 0.1, 0.25, 1)";
      line.style.width = `${px}px`;
    });
  }

  function waitPreloader(cb) {
    const preloader = document.querySelector(".preloader");
    if (!preloader) return cb();
    if (preloader.classList.contains("load")) return cb();

    const mo = new MutationObserver(() => {
      if (preloader.classList.contains("load")) {
        mo.disconnect();
        cb();
      }
    });
    mo.observe(preloader, { attributes: true });
  }

  /****************************************
   * HEADER (после прелоадера)
   ****************************************/
  function initHeader() {
    const header = document.querySelector(".header");
    if (!header) return;

    header.style.opacity = "0";
    header.style.transform = "translateY(-100px)";
    header.style.willChange = "opacity, transform";

    waitPreloader(() => {
      header.style.transition = "opacity 600ms ease, transform 600ms ease";
      requestAnimationFrame(() => {
        header.style.opacity = "1";
        header.style.transform = "translateY(0)";
      });
    });
  }
  document.addEventListener("DOMContentLoaded", initHeader);

  /****************************************
   * HERO (поочерёдно, после прелоадера)
   ****************************************/
  function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const muted = hero.querySelector(".hero-content__muted");
    const title = hero.querySelector(".hero-content__title");
    const subtitle = hero.querySelector(".hero-content__subtitle");
    const actions = hero.querySelector(".hero-content__actions");
    const infoItems = hero.querySelectorAll(".hero-content__info-item");
    const counts = hero.querySelectorAll(".hero-content__info-count");

    setInit(hero, 30);
    [muted, title, subtitle, actions].forEach((el) => setInit(el, 15));
    infoItems.forEach((el) => setInit(el, 10));

    waitPreloader(() => {
      setShow(hero, 600);
      setTimeout(() => setShow(muted, 600), 150);
      setTimeout(() => setShow(title, 600), 300);
      setTimeout(() => setShow(subtitle, 600), 450);
      setTimeout(() => setShow(actions, 600), 600);

      infoItems.forEach((el, i) => {
        setTimeout(() => {
          setShow(el, 600);
          animateCounter(counts[i]);
        }, 750 + i * 150);
      });
    });
  }
  document.addEventListener("DOMContentLoaded", initHero);

  /****************************************
   * OBSERVER ДЛЯ КАЖДОГО ЭЛЕМЕНТА
   ****************************************/
  const animMap = new WeakMap();
  const elementObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const run = animMap.get(el);
        if (typeof run === "function") run(el);
        elementObserver.unobserve(el);
        animMap.delete(el);
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.05,
    }
  );

  function observe(el, onEnter) {
    if (!el) return;
    animMap.set(el, onEnter);
    elementObserver.observe(el);
  }

  /****************************************
   * ПОДГОТОВКА СЕКЦИЙ И ЭЛЕМЕНТОВ
   ****************************************/
  function prepSection(sec) {
    if (!sec) return;

    // Авто-имя секции
    if (!sec.dataset.sectionName) {
      if (sec.classList.contains("service"))
        sec.dataset.sectionName = "service";
      else if (sec.classList.contains("achievements"))
        sec.dataset.sectionName = "achievements";
      else if (sec.classList.contains("advantages"))
        sec.dataset.sectionName = "advantages";
      else if (sec.classList.contains("portfolio"))
        sec.dataset.sectionName = "portfolio";
      else if (sec.classList.contains("about"))
        sec.dataset.sectionName = "about";
      else if (sec.classList.contains("form")) sec.dataset.sectionName = "form";
    }

    const name = sec.dataset.sectionName || "";

    // Базовая инициализация секции
    setInit(sec, 40);
    sec.style.transition = "opacity .6s ease, transform .6s ease";
    observe(sec, (el) => setShow(el, 600));

    // Для каждой секции — подэлементы наблюдаем ПО ОТДЕЛЬНОСТИ
    if (name === "service") {
      const title = sec.querySelector(".service__title");
      const subtitle = sec.querySelector(".service__subtitle");
      const blocks = sec.querySelectorAll(".service-blocks__item");

      setInit(title, 25);
      setInit(subtitle, 25);
      blocks.forEach((b) => setInit(b, 20));

      observe(title, (el) => setShow(el, 600));
      observe(subtitle, (el) => setShow(el, 600));
      blocks.forEach((b) => observe(b, (el) => setShow(el, 600)));
    }

    if (name === "achievements") {
      const subtitle = sec.querySelector(".achievements__subtitle");
      const title = sec.querySelector(".achievements__title");
      const text = sec.querySelector(".achievements__text");
      const topCards = sec.querySelectorAll(".achievements-info__item");
      const stageItems = sec.querySelectorAll(".achievements-stage__item");
      const rows = sec.querySelectorAll(".achievements-stage__height");

      setInit(subtitle, 25);
      setInit(title, 25);
      setInit(text, 25);
      topCards.forEach((c) => setInit(c, 20));
      stageItems.forEach((it) => setInit(it, 20));
      rows.forEach((r) => setInit(r, 15));

      // подготовка столбиков графика к 0
      sec.querySelectorAll(".achievements-stage__stage-sep").forEach((bar) => {
        bar.style.height = "0px";
        if (!bar.style.transition) bar.style.transition = "height 600ms ease";
        bar.style.overflow = "hidden";
      });

      observe(subtitle, (el) => setShow(el, 600));
      observe(title, (el) => setShow(el, 600));
      observe(text, (el) => setShow(el, 600));

      topCards.forEach((card) =>
        observe(card, (el) => {
          setShow(el, 600);
          const cnt = el.querySelector(".achievements-info__item-count");
          if (cnt) animateCounter(cnt, 1200);
        })
      );

      stageItems.forEach((it) => observe(it, (el) => setShow(el, 600)));

      rows.forEach((row) =>
        observe(row, (el) => {
          setShow(el, 600);
          const bar = el.querySelector(".achievements-stage__stage-sep");
          const h = parseFloat(el.dataset.height);
          if (bar && !isNaN(h)) {
            bar.style.height = `${h}px`;
          }
          const counts = el.querySelectorAll(".counts");
          const bottom = counts[counts.length - 1];
          if (bottom) animateCounter(bottom, 1000);
        })
      );

      // Левый общий счётчик "Years of experience", если есть
      const leftCount = sec.querySelector(
        ".achievements-stage__item .achievements-stage__item-count"
      );
      if (leftCount) {
        observe(leftCount, (el) => animateCounter(el, 1200));
      }
    }

    if (name === "advantages") {
      const title = sec.querySelector(".advantages__title");
      const text = sec.querySelector(".advantages__text");
      const blocks = sec.querySelectorAll(".advantages__blocks-item");
      const list = sec.querySelectorAll(".advantages__list-item");

      setInit(title, 25);
      setInit(text, 25);
      blocks.forEach((b) => setInit(b, 30));
      list.forEach((li) => setInit(li, 20));

      observe(title, (el) => setShow(el, 600));
      observe(text, (el) => setShow(el, 600));
      blocks.forEach((b) => observe(b, (el) => setShow(el, 600)));
      list.forEach((li) => observe(li, (el) => setShow(el, 600)));
    }

    if (name === "portfolio") {
      const items = sec.querySelectorAll(".portfolio-blocks__item");
      items.forEach((item) => {
        setInit(item, 20);
        observe(item, (el) => {
          setShow(el, 600);
          const count = el.querySelector(".portfolio-blocks__item-count");
          if (count) animateCounter(count);
          animateBar(el);
        });
      });
    }

    if (name === "about") {
      const items = sec.querySelectorAll(".about-blocks__item");
      items.forEach((it) => {
        setInit(it, 60);
        observe(it, (el) => setShow(el, 500));
      });
    }

    if (name === "form") {
      // Только секция. Внутренние элементы НЕ трогаем.
      setInit(sec, 60);
      // (секция уже наблюдается выше через observe(sec, ...))
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelectorAll(
        ".service, .achievements, .advantages, .portfolio, .about, .form"
      )
      .forEach((sec) => prepSection(sec));
  });
})();
