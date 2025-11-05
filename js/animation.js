/***********************************
 HEADER
***********************************/
function runHeaderAnimation() {
  const header = document.querySelector(".header");
  const preloader = document.querySelector(".preloader");

  if (preloader && !preloader.classList.contains("load")) return;
  if (!header) return;

  header.style.transition = "opacity .6s ease, transform .6s ease";
  requestAnimationFrame(() => {
    header.style.opacity = "1";
    header.style.transform = "translateY(0)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  if (!header) return;
  header.style.opacity = "0";
  header.style.transform = "translateY(-100px)";
});

// ожидание пока preloader.add("load")
const preloaderEl = document.querySelector(".preloader");
if (preloaderEl) {
  const observer = new MutationObserver(() => {
    if (preloaderEl.classList.contains("load")) {
      runHeaderAnimation();
      observer.disconnect();
    }
  });
  observer.observe(preloaderEl, { attributes: true });
}

/***********************************
 HELPERS
***********************************/
function triggerPoint(section) {
  const rect = section.getBoundingClientRect();
  const isMobile = window.innerWidth <= 440;

  if (isMobile) return rect.top <= window.innerHeight * 0.95;
  return rect.top <= window.innerHeight * 0.3;
}

function animateCounter(el) {
  if (!el) return;
  const original = el.textContent.trim();
  const numeric = parseFloat(original.replace(/[^0-9.]/g, ""));
  if (isNaN(numeric)) return;

  const suffix = original.replace(/[0-9.]/g, "");
  const duration = 1200;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * numeric) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/***********************************
 HERO (запуск строго после preloader.load)
***********************************/
function runHeroAnimation() {
  const hero = document.querySelector(".hero");
  const muted = document.querySelector(".hero-content__muted");
  const title = document.querySelector(".hero-content__title");
  const subtitle = document.querySelector(".hero-content__subtitle");
  const actions = document.querySelector(".hero-content__actions");
  const infoItems = document.querySelectorAll(".hero-content__info-item");
  const counts = document.querySelectorAll(".hero-content__info-count");

  hero.style.transition =
    muted.style.transition =
    title.style.transition =
    subtitle.style.transition =
    actions.style.transition =
      "opacity .6s ease, transform .6s ease";

  hero.style.opacity = "1";
  hero.style.transform = "translateY(0)";

  setTimeout(
    () => (
      (muted.style.opacity = "1"), (muted.style.transform = "translateY(0)")
    ),
    150
  );
  setTimeout(
    () => (
      (title.style.opacity = "1"), (title.style.transform = "translateY(0)")
    ),
    300
  );
  setTimeout(
    () => (
      (subtitle.style.opacity = "1"),
      (subtitle.style.transform = "translateY(0)")
    ),
    450
  );
  setTimeout(
    () => (
      (actions.style.opacity = "1"), (actions.style.transform = "translateY(0)")
    ),
    600
  );

  infoItems.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = "1";
      item.style.transform = "translateY(0)";
      animateCounter(counts[index]);
    }, 750 + index * 150);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const hero = document.querySelector(".hero");
  const muted = document.querySelector(".hero-content__muted");
  const title = document.querySelector(".hero-content__title");
  const subtitle = document.querySelector(".hero-content__subtitle");
  const actions = document.querySelector(".hero-content__actions");
  const infoItems = document.querySelectorAll(".hero-content__info-item");
  const preloader = document.querySelector(".preloader");

  hero.style.opacity = "0";
  hero.style.transform = "translateY(30px)";
  muted.style.opacity = "0";
  muted.style.transform = "translateY(15px)";
  title.style.opacity = "0";
  title.style.transform = "translateY(15px)";
  subtitle.style.opacity = "0";
  subtitle.style.transform = "translateY(15px)";
  actions.style.opacity = "0";
  actions.style.transform = "translateY(15px)";
  infoItems.forEach(
    (i) => ((i.style.opacity = "0"), (i.style.transform = "translateY(15px)"))
  );

  const observer = new MutationObserver(() => {
    if (preloader.classList.contains("load")) {
      setTimeout(runHeroAnimation, 500); // строго через 1 сек после .load
      observer.disconnect();
    }
  });
  observer.observe(preloader, { attributes: true });
});

/***********************************
 SERVICE  (mobile animates items on visibility)
***********************************/
function animateServiceSection() {
  const section = document.querySelector(".service");
  const blocks = document.querySelectorAll(".service-blocks__item");
  const title = document.querySelector(".service__title");
  const subtitle = document.querySelector(".service__subtitle");

  section.style.opacity = "0";
  section.style.transform = "translateY(30px)";
  title.style.opacity = "0";
  title.style.transform = "translateY(15px)";
  subtitle.style.opacity = "0";
  subtitle.style.transform = "translateY(15px)";
  blocks.forEach(
    (item) => (
      (item.style.opacity = "0"), (item.style.transform = "translateY(20px)")
    )
  );

  function onScroll() {
    if (!triggerPoint(section)) return;

    section.style.transition =
      title.style.transition =
      subtitle.style.transition =
        "opacity .6s ease, transform .6s ease";

    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
    setTimeout(
      () => (
        (title.style.opacity = "1"), (title.style.transform = "translateY(0)")
      ),
      150
    );
    setTimeout(
      () => (
        (subtitle.style.opacity = "1"),
        (subtitle.style.transform = "translateY(0)")
      ),
      350
    );

    if (window.innerWidth <= 440) {
      const blockObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transition =
              "opacity .6s ease, transform .6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            blockObs.unobserve(entry.target);
          }),
        { threshold: 0.3 }
      );
      blocks.forEach((block) => blockObs.observe(block));
    } else {
      blocks.forEach((block, i) => {
        block.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(
          () => (
            (block.style.opacity = "1"),
            (block.style.transform = "translateY(0)")
          ),
          600 + i * 120
        );
      });
    }

    window.removeEventListener("scroll", onScroll);
  }

  window.addEventListener("scroll", onScroll);
}
window.addEventListener("load", animateServiceSection);

/***********************************
 ACHIEVEMENTS  (mobile animates each block on visibility)
***********************************/
function animateAchievementsSection() {
  const section = document.querySelector(".achievements");
  const subtitle = document.querySelector(".achievements__subtitle");
  const title = document.querySelector(".achievements__title");
  const itemsTop = document.querySelectorAll(".achievements-info__item");
  const bottomItems = document.querySelectorAll(".achievements-stage__item");
  const text = document.querySelector(".achievements__text");

  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  subtitle.style.opacity = "0";
  subtitle.style.transform = "translateY(20px)";
  title.style.opacity = "0";
  title.style.transform = "translateY(20px)";
  text.style.opacity = "0";
  text.style.transform = "translateY(20px)";
  itemsTop.forEach(
    (i) => ((i.style.opacity = "0"), (i.style.transform = "translateY(20px)"))
  );
  bottomItems.forEach(
    (i) => ((i.style.opacity = "0"), (i.style.transform = "translateY(20px)"))
  );

  function onScroll() {
    if (!triggerPoint(section)) return;

    section.style.transition =
      subtitle.style.transition =
      title.style.transition =
      text.style.transition =
        "opacity .6s ease, transform .6s ease";

    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
    setTimeout(
      () => (
        (subtitle.style.opacity = "1"),
        (subtitle.style.transform = "translateY(0)")
      ),
      150
    );
    setTimeout(
      () => (
        (title.style.opacity = "1"), (title.style.transform = "translateY(0)")
      ),
      300
    );

    if (window.innerWidth <= 440) {
      const obs = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transition =
              "opacity .6s ease, transform .6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            const num = entry.target.querySelector(
              ".achievements-info__item-count, .achievements-stage__item-count"
            );
            animateCounter(num);
            obs.unobserve(entry.target);
          }),
        { threshold: 0.4 }
      );

      itemsTop.forEach((item) => obs.observe(item));
      bottomItems.forEach((item) => obs.observe(item));
    } else {
      itemsTop.forEach((item, i) => {
        item.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          animateCounter(item.querySelector(".achievements-info__item-count"));
        }, 500 + i * 150);
      });

      bottomItems.forEach((item, i) => {
        item.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          animateCounter(item.querySelector(".achievements-stage__item-count"));
        }, 1000 + i * 200);
      });
    }

    setTimeout(
      () => (
        (text.style.opacity = "1"), (text.style.transform = "translateY(0)")
      ),
      1700
    );
    window.removeEventListener("scroll", onScroll);
  }

  window.addEventListener("scroll", onScroll);
}
window.addEventListener("load", animateAchievementsSection);

/***********************************
 ADVANTAGES (mobile visible blocks only)
***********************************/
function animateAdvantagesSection() {
  const section = document.querySelector(".advantages");
  const title = document.querySelector(".advantages__title");
  const blocks = document.querySelectorAll(".advantages__blocks-item");
  const text = document.querySelector(".advantages__text");
  const listItems = document.querySelectorAll(".advantages__list-item");

  section.style.opacity = "0";
  section.style.transform = "translateY(40px)";
  title.style.opacity = "0";
  title.style.transform = "translateY(20px)";
  text.style.opacity = "0";
  text.style.transform = "translateY(20px)";
  blocks.forEach(
    (i) => ((i.style.opacity = "0"), (i.style.transform = "translateY(30px)"))
  );
  listItems.forEach(
    (i) => ((i.style.opacity = "0"), (i.style.transform = "translateY(20px)"))
  );

  function onScroll() {
    if (!triggerPoint(section)) return;

    section.style.transition =
      title.style.transition =
      text.style.transition =
        "opacity .6s ease, transform .6s ease";

    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
    setTimeout(
      () => (
        (title.style.opacity = "1"), (title.style.transform = "translateY(0)")
      ),
      200
    );

    if (window.innerWidth <= 440) {
      const blockObs = new IntersectionObserver(
        (entries) =>
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.style.transition =
              "opacity .6s ease, transform .6s ease";
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
            blockObs.unobserve(entry.target);
          }),
        { threshold: 0.3 }
      );

      blocks.forEach((block) => blockObs.observe(block));
      listItems.forEach((li) => blockObs.observe(li));
    } else {
      blocks.forEach((item, index) => {
        item.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(
          () => (
            (item.style.opacity = "1"), (item.style.transform = "translateY(0)")
          ),
          400 + index * 150
        );
      });

      listItems.forEach((item, index) => {
        item.style.transition = "opacity .6s ease, transform .6s ease";
        setTimeout(
          () => (
            (item.style.opacity = "1"), (item.style.transform = "translateY(0)")
          ),
          1100 + index * 120
        );
      });
    }

    setTimeout(
      () => (
        (text.style.opacity = "1"), (text.style.transform = "translateY(0)")
      ),
      950
    );
    window.removeEventListener("scroll", onScroll);
  }

  window.addEventListener("scroll", onScroll);
}
window.addEventListener("load", animateAdvantagesSection);

/***********************************
 PORTFOLIO
***********************************/
function animateBar(block) {
  const body = block.querySelector(".portfolio-blocks__item-body");
  const line = block.querySelector(".line");
  const countEl = block.querySelector(".portfolio-blocks__item-count");
  if (!body || !line || !countEl) return;

  const percent = parseFloat(countEl.textContent.replace(/[^0-9.]/g, "")) || 0;
  line.style.width = "0px";

  requestAnimationFrame(() => {
    line.style.transition = "width 1.2s cubic-bezier(0.25, 0.1, 0.25, 1)";
    line.style.width = `${(percent / 100) * body.clientWidth}px`;
  });
}

const portfolioSection = document.querySelector(".portfolio");
if (portfolioSection) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;

      const items = portfolioSection.querySelectorAll(
        ".portfolio-blocks__item"
      );
      items.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(20px)";
        item.style.transition = "opacity .6s ease, transform .6s ease";

        setTimeout(() => {
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
          animateCounter(item.querySelector(".portfolio-blocks__item-count"));
          animateBar(item);
        }, index * 200);
      });

      observer.disconnect();
    },
    { threshold: window.innerWidth <= 440 ? 0.1 : 0.3 }
  );
  observer.observe(portfolioSection);
}

/***********************************
 ABOUT
***********************************/
document.addEventListener("DOMContentLoaded", () => {
  const block = document.querySelector(".about");
  const items = document.querySelectorAll(".about-blocks__item");
  if (!block || !items.length) return;

  block.style.opacity = "0";
  block.style.transform = "translateY(120px)";
  items.forEach(
    (item) => (
      (item.style.opacity = "0"), (item.style.transform = "translateY(60px)")
    )
  );

  function onScroll() {
    if (triggerPoint(block)) {
      block.style.opacity = "1";
      block.style.transform = "translateY(0)";
      block.style.transition = "opacity 0.7s ease, transform 0.7s ease";

      items.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = "opacity .5s ease, transform .5s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 120);
      });

      window.removeEventListener("scroll", onScroll);
    }
  }
  window.addEventListener("scroll", onScroll);
});

/***********************************
 FORM
***********************************/
document.addEventListener("DOMContentLoaded", () => {
  const formSection = document.querySelector(".form");
  const animatedItems = document.querySelectorAll(
    ".form-content img, .form__muted, .form__subtitle, .user-action input, .user-action textarea, .form__btn"
  );

  if (!formSection || !animatedItems.length) return;

  formSection.style.opacity = "0";
  formSection.style.transform = "translateY(60px)";
  animatedItems.forEach(
    (item) => (
      (item.style.opacity = "0"), (item.style.transform = "translateY(35px)")
    )
  );

  function onScroll() {
    if (triggerPoint(formSection)) {
      formSection.style.opacity = "1";
      formSection.style.transform = "translateY(0)";
      formSection.style.transition = "opacity .7s ease, transform .7s ease";

      animatedItems.forEach((item, index) => {
        setTimeout(() => {
          item.style.transition = "opacity .6s ease, transform .6s ease";
          item.style.opacity = "1";
          item.style.transform = "translateY(0)";
        }, index * 150);
      });

      window.removeEventListener("scroll", onScroll);
    }
  }

  window.addEventListener("scroll", onScroll);
});
