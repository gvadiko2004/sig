document.addEventListener("DOMContentLoaded", () => {
  const btnMenu = document.querySelector(".header__border-menu");
  const menu = document.querySelector(".menu-phone");
  const menuItems = document.querySelectorAll(".menu-phone__list-item");
  const headerBtns = document.querySelectorAll(".header__btn"); // <<< добавлено

  const iconMenu = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M5 9H23C23.2652 9 23.5196 8.89464 23.7071 8.70711C23.8946 8.51957 24 8.26522 24 8C24 7.73478 23.8946 7.48043 23.7071 7.29289C23.5196 7.10536 23.2652 7 23 7H5C4.73478 7 4.48043 7.10536 4.29289 7.29289C4.10536 7.48043 4 7.73478 4 8C4 8.26522 4.10536 8.51957 4.29289 8.70711C4.48043 8.89464 4.73478 9 5 9Z" fill="white"></path>
      <path d="M5 15H23C23.2652 15 23.5196 14.8946 23.7071 14.7071C23.8946 14.5196 24 14.2652 24 14C24 13.7348 23.8946 13.4804 23.7071 13.2929C23.5196 13.1054 23.2652 13 23 13H5C4.73478 13 4.48043 13.1054 4.29289 13.2929C4.10536 13.4804 4 13.7348 4 14C4 14.2652 4.10536 14.5196 4.29289 14.7071C4.48043 14.8946 4.73478 15 5 15Z" fill="white"></path>
      <path d="M5 21H23C23.2652 21 23.5196 20.8946 23.7071 20.7071C23.8946 20.5196 24 20.2652 24 20C24 19.7348 23.8946 19.4804 23.7071 19.2929C23.5196 19.1054 23.2652 19 23 19H5C4.73478 19 4.48043 19.1054 4.29289 19.2929C4.10536 19.4804 4 19.7348 4 20C4 20.2652 4.10536 20.5196 4.29289 20.7071C4.48043 20.8946 4.73478 21 5 21Z" fill="white"></path>
    </svg>`;

  const iconClose = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M20.1426 6.41406C20.4076 6.41418 20.6622 6.5196 20.8496 6.70703C21.037 6.89453 21.1426 7.14896 21.1426 7.41406C21.1426 7.67915 21.037 7.93358 20.8496 8.12109L15.3027 13.667L21.0713 19.4346C21.2588 19.6221 21.3643 19.8774 21.3643 20.1426C21.3641 20.4076 21.2587 20.6622 21.0713 20.8496C20.8838 21.037 20.6293 21.1425 20.3643 21.1426C20.0992 21.1426 19.8447 21.0369 19.6572 20.8496L13.8887 15.0811L8.12109 20.8496C7.93359 21.0369 7.67913 21.1416 7.41406 21.1416C7.14898 21.1416 6.89452 21.037 6.70703 20.8496C6.51961 20.6622 6.41419 20.4076 6.41406 20.1426C6.41406 19.8774 6.51949 19.6221 6.70703 19.4346L12.4746 13.667L6.92871 8.12109C6.7413 7.93358 6.63574 7.67919 6.63574 7.41406C6.63578 7.14892 6.74124 6.89453 6.92871 6.70703C7.11619 6.51955 7.37061 6.41413 7.63574 6.41406C7.90087 6.41406 8.15526 6.51962 8.34277 6.70703L13.8887 12.252L19.4346 6.70703C19.6221 6.51949 19.8774 6.41406 20.1426 6.41406Z" fill="white"/>
    </svg>`;

  function closeMenu() {
    menu.classList.remove("active");
    document.body.style.overflow = "";
    btnMenu.innerHTML = iconMenu;
  }

  // Toggle menu
  btnMenu.addEventListener("click", () => {
    menu.classList.toggle("active");

    if (menu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
      btnMenu.innerHTML = iconClose;
    } else {
      closeMenu();
    }
  });

  // Закрываем при клике на пункт меню
  menuItems.forEach(item => item.addEventListener("click", closeMenu));

  // ✅ Закрываем при клике на .header__btn
  headerBtns.forEach(btn => btn.addEventListener("click", closeMenu));
});
