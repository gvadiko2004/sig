document.addEventListener("DOMContentLoaded", () => {
  // ============================================
  //         ФУНКЦИИ АКТИВАЦИИ ПО VALUE
  // ============================================

  function activateByValue(value) {
    const item = document.querySelector(
      `.portfolio-blocks__item[data-portfolio-range-value="${value}"]`
    );
    const resp = document.querySelector(
      `.portfolio-blocks__item-resp[data-portfolio-resp-value="${value}"]`
    );

    if (item) item.classList.add("active");
    if (resp) resp.classList.add("active");

    pauseAllOrbits(); // <-- добавлено
  }

  function deactivateByValue(value) {
    const item = document.querySelector(
      `.portfolio-blocks__item[data-portfolio-range-value="${value}"]`
    );
    const resp = document.querySelector(
      `.portfolio-blocks__item-resp[data-portfolio-resp-value="${value}"]`
    );

    if (item) item.classList.remove("active");
    if (resp) resp.classList.remove("active");

    resumeAllOrbits(); // <-- добавлено
  }

  // ============================================
  //      ОСТАНОВКА / ПРОДОЛЖЕНИЕ ОРБИТ (SVG)
  // ============================================

  const svgs = document.querySelectorAll("svg");

  // ❗ Останавливает орбиту в той же позиции (не перезапускает)
  function pauseAllOrbits() {
    svgs.forEach(svg => {
      try {
        svg.pauseAnimations(); // <--- магия SVG SMIL
      } catch (e) {}
    });
  }

  // ❗ Продолжает вращение с текущего места
  function resumeAllOrbits() {
    svgs.forEach(svg => {
      try {
        svg.unpauseAnimations();
      } catch (e) {}
    });
  }

  // ============================================
  //         СОБЫТИЯ ХОВЕРА НА КАРТОЧКАХ
  // ============================================

  // 1) большие карточки (range)
  document.querySelectorAll(".portfolio-blocks__item").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      activateByValue(item.dataset.portfolioRangeValue);
    });

    item.addEventListener("mouseleave", () => {
      deactivateByValue(item.dataset.portfolioRangeValue);
    });
  });

  // 2) маленькие карточки на орбите (resp)
  document.querySelectorAll(".portfolio-blocks__item-resp").forEach((resp) => {
    resp.addEventListener("mouseenter", () => {
      activateByValue(resp.dataset.portfolioRespValue);
    });

    resp.addEventListener("mouseleave", () => {
      deactivateByValue(resp.dataset.portfolioRespValue);
    });
  });
});

// 

document.addEventListener("DOMContentLoaded", () => {
  const fields = document.querySelectorAll(".user-action input, .user-action textarea");

  fields.forEach((field) => {
    const toggleOpacity = () => {
      if (field.value.trim().length > 0 || field === document.activeElement) {
        field.classList.add("active");
      } else {
        field.classList.remove("active");
      }
    };

    field.addEventListener("input", toggleOpacity);
    field.addEventListener("focus", toggleOpacity);
    field.addEventListener("blur", toggleOpacity);

    // запуск при загрузке, если авто-заполнение (autocomplete)
    toggleOpacity();
  });
});
