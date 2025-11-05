// ================= PRELOADER ================= //

const item = document.querySelector(".item-2");
let angle = 0;

function rotate() {
  angle += 0.3;
  if (angle >= 360) angle = 0;
  if (item) {
    item.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  }
  requestAnimationFrame(rotate);
}
rotate();

const preloader = document.querySelector(".preloader");
const progressSpan = document.querySelector(".preloader__circle-item span");
const preloadItem = document.querySelector(".preloader__circle-item");

let startTime = Date.now();
let duration = 4200;

function updateProgress() {
  let elapsed = Date.now() - startTime;
  let progress = Math.min((elapsed / duration) * 100, 100);

  progressSpan.textContent = `${Math.round(progress)}%`;

  if (progress >= 98) {
    preloader.classList.add("load"); // ✅ СИГНАЛ ДЛЯ animation.js
  }

  if (progress < 100) {
    requestAnimationFrame(updateProgress);
  } else {
    setTimeout(() => {
      preloadItem.style.display = "none";
    }, 500);
  }
}

updateProgress();
