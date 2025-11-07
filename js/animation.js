(() => {
  "use strict";

  /****************************************
   * GLOBAL SETTERS
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

  /****************************************
   * COUNTER
   ****************************************/
  function animateCounter(el, duration = 1200) {
    if (!el) return;
    const original = el.textContent.trim();
    const num = parseFloat(original.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) return;
    const suffix = original.replace(/[0-9.]/g, "");
    const startTS = performance.now();

    function tick(now) {
      const p = Math.min((now - startTS) / duration, 1);
      el.textContent = Math.floor(p * num) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  /****************************************
   * PORTFOLIO BAR
   ****************************************/
  function animateBar(block) {
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

  /****************************************
   * PRELOADER WAIT
   ****************************************/
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
   * HEADER — сверху вниз ✅
   ****************************************/
  function initHeader() {
    const header = document.querySelector(".header");
    if (!header) return;

    // ✅ Инициализация (header сверху)
    header.style.opacity = "0";
    header.style.transform = "translateY(-100px)";
    header.style.willChange = "opacity, transform";

    waitPreloader(() => {
      setTimeout(() => {
        header.style.transition = "opacity 600ms ease, transform 600ms ease";
        requestAnimationFrame(() => {
          header.style.opacity = "1";
          header.style.transform = "translateY(0)";
        });
      }, 150);
    });
  }

  document.addEventListener("DOMContentLoaded", initHeader);

  /****************************************
   * HERO
   ****************************************/
  function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const muted = document.querySelector(".hero-content__muted");
    const title = document.querySelector(".hero-content__title");
    const subtitle = document.querySelector(".hero-content__subtitle");
    const actions = document.querySelector(".hero-content__actions");
    const infoItems = document.querySelectorAll(".hero-content__info-item");
    const counts = document.querySelectorAll(".hero-content__info-count");

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
   * OBSERVER — анимации секций
   ****************************************/
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sec = entry.target;
        const name = sec.dataset.sectionName;

        const run = {
          service() {
            setShow(sec, 600);
            sec
              .querySelectorAll(".service-blocks__item")
              .forEach((b, i) =>
                setTimeout(() => setShow(b, 600), 200 + i * 150)
              );
          },

          achievements() {
            setShow(sec, 600);
            const top = sec.querySelectorAll(".achievements-info__item");
            const bottom = sec.querySelectorAll(".achievements-stage__item");

            top.forEach((item, i) => {
              setTimeout(() => {
                setShow(item, 600);
                animateCounter(
                  item.querySelector(".achievements-info__item-count")
                );
              }, 200 + i * 200);
            });

            bottom.forEach((item, i) => {
              setTimeout(() => {
                setShow(item, 600);
                animateCounter(
                  item.querySelector(".achievements-stage__item-count")
                );
              }, 800 + i * 200);
            });
          },

          advantages() {
            setShow(sec, 600);
            sec
              .querySelectorAll(".advantages__blocks-item")
              .forEach((item, i) =>
                setTimeout(() => setShow(item, 600), 200 + i * 150)
              );
          },

          portfolio() {
            setShow(sec, 600);
            sec
              .querySelectorAll(".portfolio-blocks__item")
              .forEach((item, i) => {
                setInit(item, 20);
                setTimeout(() => {
                  setShow(item, 600);
                  animateCounter(
                    item.querySelector(".portfolio-blocks__item-count")
                  );
                  animateBar(item);
                }, i * 200);
              });
          },

          about() {
            setShow(sec, 600);
            sec
              .querySelectorAll(".about-blocks__item")
              .forEach((item, i) =>
                setTimeout(() => setShow(item, 500), i * 120)
              );
          },

          form() {
            // ✅ форма — только fade + translateY
            setShow(sec, 700);
          },
        };

        if (run[name]) run[name]();
        else setShow(sec, 600);

        sectionObserver.unobserve(sec);
      });
    },
    {
      threshold: 0.05,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  /****************************************
   * SECTION PREP INIT
   ****************************************/
  function prepSection(sec, dySection = 40) {
    if (!sec) return;

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

    if (sec.dataset.sectionName === "form") {
      setInit(sec, dySection);
      sectionObserver.observe(sec);
      return;
    }

    setInit(sec, dySection);

    if (sec.classList.contains("service")) {
      sec
        .querySelectorAll(".service-blocks__item")
        .forEach((el) => setInit(el, 20));
    }
    if (sec.classList.contains("achievements")) {
      sec
        .querySelectorAll(".achievements-info__item")
        .forEach((el) => setInit(el, 20));
      sec
        .querySelectorAll(".achievements-stage__item")
        .forEach((el) => setInit(el, 20));
    }
    if (sec.classList.contains("advantages")) {
      sec
        .querySelectorAll(".advantages__blocks-item")
        .forEach((el) => setInit(el, 30));
    }
    if (sec.classList.contains("portfolio")) {
      sec
        .querySelectorAll(".portfolio-blocks__item")
        .forEach((el) => setInit(el, 20));
    }
    if (sec.classList.contains("about")) {
      sec
        .querySelectorAll(".about-blocks__item")
        .forEach((el) => setInit(el, 30));
    }

    sectionObserver.observe(sec);
  }

  document.addEventListener("DOMContentLoaded", () => {
    document
      .querySelectorAll(
        ".service, .achievements, .advantages, .portfolio, .about, .form"
      )
      .forEach((sec) => prepSection(sec));
  });
})();
