const btnMenu = document.querySelector(".header__border-menu");
const menu = document.querySelector(".menu-phone");

btnMenu.addEventListener("click", function () {
  menu.classList.toggle("active");

  // Блокировка / разблокировка скролла
  if (menu.classList.contains("active")) {
    document.body.style.overflow = "hidden"; // блокируем скролл
  } else {
    document.body.style.overflow = ""; // возвращаем (очищаем стиль)
  }
});
