/****************************************
 * ВСПОМОГАТЕЛЬНОЕ: безопасные сеттеры
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
  // rAF, чтобы transition применилась после init-стилей
  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });
}

/****************************************
 * СЧЁТЧИКИ
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
  if (!block) return;
  const body = block.querySelector(".portfolio-blocks__item-body");
  const line = block.querySelector(".line");
  const countEl = block.querySelector(".portfolio-blocks__item-count");
  if (!body || !line || !countEl) return;

  const percent = parseFloat(countEl.textContent.replace(/[^0-9.]/g, "")) || 0;
  const targetPx = (percent / 100) * body.clientWidth;

  line.style.width = "0px";
  requestAnimationFrame(() => {
    line.style.transition = "width 1200ms cubic-bezier(0.25, 0.1, 0.25, 1)";
    line.style.width = `${targetPx}px`;
  });
}

/****************************************
 * ПРЕЛОАДЕР: дождаться .load и запустить cb()
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
 * HEADER: только после preloader.load
 ****************************************/
function initHeader() {
  const header = document.querySelector(".header");
  if (!header) return;

  // старт
  header.style.opacity = "0";
  header.style.transform = "translateY(-100px)";

  waitPreloader(() => {
    setShow(header, 600);
  });
}
document.addEventListener("DOMContentLoaded", initHeader);

/****************************************
 * HERO: только после preloader.load
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

  // init
  setInit(hero, 30);
  setInit(muted, 15);
  setInit(title, 15);
  setInit(subtitle, 15);
  setInit(actions, 15);
  infoItems.forEach((el) => setInit(el, 15));

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
 * OBSERVER: все остальные секции
 ****************************************/
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const sec = entry.target;

      // Определяем по секции, что внутри анимировать и в каком порядке
      const name = sec.dataset.sectionName;

      const plan = {
        service: () => {
          const title = sec.querySelector(".service__title");
          const subtitle = sec.querySelector(".service__subtitle");
          const blocks = sec.querySelectorAll(".service-blocks__item");

          setShow(sec, 600);
          setTimeout(() => setShow(title, 600), 150);
          setTimeout(() => setShow(subtitle, 600), 300);
          blocks.forEach((b, i) =>
            setTimeout(() => setShow(b, 600), 500 + i * 120)
          );
        },

        achievements: () => {
          const subtitle = sec.querySelector(".achievements__subtitle");
          const title = sec.querySelector(".achievements__title");
          const top = sec.querySelectorAll(".achievements-info__item");
          const bottom = sec.querySelectorAll(".achievements-stage__item");
          const text = sec.querySelector(".achievements__text");

          setShow(sec, 600);
          setTimeout(() => setShow(subtitle, 600), 150);
          setTimeout(() => setShow(title, 600), 300);

          top.forEach((item, i) => {
            setTimeout(() => {
              setShow(item, 600);
              animateCounter(
                item.querySelector(".achievements-info__item-count")
              );
            }, 500 + i * 150);
          });

          bottom.forEach((item, i) => {
            setTimeout(() => {
              setShow(item, 600);
              animateCounter(
                item.querySelector(".achievements-stage__item-count")
              );
            }, 1000 + i * 200);
          });

          setTimeout(() => setShow(text, 600), 1700);
        },

        advantages: () => {
          const title = sec.querySelector(".advantages__title");
          const blocks = sec.querySelectorAll(".advantages__blocks-item");
          const text = sec.querySelector(".advantages__text");
          const list = sec.querySelectorAll(".advantages__list-item");

          setShow(sec, 600);
          setTimeout(() => setShow(title, 600), 200);
          blocks.forEach((el, i) =>
            setTimeout(() => setShow(el, 600), 400 + i * 150)
          );
          setTimeout(() => setShow(text, 600), 950);
          list.forEach((el, i) =>
            setTimeout(() => setShow(el, 600), 1100 + i * 120)
          );
        },

        portfolio: () => {
          setShow(sec, 600);
          const items = sec.querySelectorAll(".portfolio-blocks__item");
          items.forEach((item, i) => {
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

        about: () => {
          const items = sec.querySelectorAll(".about-blocks__item");
          setShow(sec, 700);
          items.forEach((it, i) => setTimeout(() => setShow(it, 500), i * 120));
        },

        form: () => {
          const animated = sec.querySelectorAll(
            ".form-content img, .form__muted, .form__subtitle, .user-action input, .user-action textarea, .form__btn"
          );
          setShow(sec, 700);
          animated.forEach((el, i) =>
            setTimeout(() => setShow(el, 600), i * 150)
          );
        },
      };

      // Запуск соответствующего плана
      if (plan[name]) {
        plan[name]();
      } else {
        // дефолт: показать секцию
        setShow(sec, 600);
      }

      sectionObserver.unobserve(sec);
    });
  },
  {
    root: null,
    rootMargin: "0px 0px -10% 0px", // старт чуть раньше полного входа
    threshold: 0.05, // достаточно 5% появления
  }
);

/****************************************
 * РЕГИСТРАЦИЯ СЕКЦИЙ
 * (инициализация стартовых стилей + подписка)
 ****************************************/
function prepSection(sec, dySection = 40, dyChild = 25) {
  if (!sec) return;
  // укажем имя секции через data-section-name, чтобы план понял, что анимировать
  if (!sec.dataset.sectionName) {
    if (sec.classList.contains("service")) sec.dataset.sectionName = "service";
    else if (sec.classList.contains("achievements"))
      sec.dataset.sectionName = "achievements";
    else if (sec.classList.contains("advantages"))
      sec.dataset.sectionName = "advantages";
    else if (sec.classList.contains("portfolio"))
      sec.dataset.sectionName = "portfolio";
    else if (sec.classList.contains("about")) sec.dataset.sectionName = "about";
    else if (sec.classList.contains("form")) sec.dataset.sectionName = "form";
  }

  // старт секции
  setInit(sec, dySection);
  sec.style.transition = "opacity .6s ease, transform .6s ease";

  // старт для ключевых дочерних элементов секции
  if (sec.classList.contains("service")) {
    setInit(sec.querySelector(".service__title"), dyChild);
    setInit(sec.querySelector(".service__subtitle"), dyChild);
    sec
      .querySelectorAll(".service-blocks__item")
      .forEach((el) => setInit(el, 20));
  } else if (sec.classList.contains("achievements")) {
    setInit(sec.querySelector(".achievements__subtitle"), dyChild);
    setInit(sec.querySelector(".achievements__title"), dyChild);
    setInit(sec.querySelector(".achievements__text"), dyChild);
    sec
      .querySelectorAll(".achievements-info__item")
      .forEach((el) => setInit(el, 20));
    sec
      .querySelectorAll(".achievements-stage__item")
      .forEach((el) => setInit(el, 20));
  } else if (sec.classList.contains("advantages")) {
    setInit(sec.querySelector(".advantages__title"), dyChild);
    setInit(sec.querySelector(".advantages__text"), dyChild);
    sec
      .querySelectorAll(".advantages__blocks-item")
      .forEach((el) => setInit(el, 30));
    sec
      .querySelectorAll(".advantages__list-item")
      .forEach((el) => setInit(el, 20));
  } else if (sec.classList.contains("portfolio")) {
    sec
      .querySelectorAll(".portfolio-blocks__item")
      .forEach((el) => setInit(el, 20));
  } else if (sec.classList.contains("about")) {
    sec
      .querySelectorAll(".about-blocks__item")
      .forEach((el) => setInit(el, 60));
  } else if (sec.classList.contains("form")) {
    const animated = sec.querySelectorAll(
      ".form-content img, .form__muted, .form__subtitle, .user-action input, .user-action textarea, .form__btn"
    );
    animated.forEach((el) => setInit(el, 35));
  }

  sectionObserver.observe(sec);
}

document.addEventListener("DOMContentLoaded", () => {
  // Соберём секции (кроме hero/header)
  [
    ".service",
    ".achievements",
    ".advantages",
    ".portfolio",
    ".about",
    ".form",
  ].forEach((sel) => {
    const sec = document.querySelector(sel);
    if (sec) prepSection(sec);
  });
});
