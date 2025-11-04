const btnMenu = document.querySelector(".header__border-menu");
const menu = document.querySelector(".menu-phone");

btnMenu.addEventListener("click", function () {
  menu.classList.toggle("active");
});
