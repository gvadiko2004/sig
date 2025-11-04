const item = document.querySelector(".item-2");
let angle = 0;

function rotate() {
  angle += 0.3;
  if (angle >= 360) angle = 0;

  item.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;
  requestAnimationFrame(rotate);
}

rotate();

const preloader = document.querySelector(".preloader");
const progressSpan = document.querySelector(".preloader__circle-item span");
const preloadItem = document.querySelector(".preloader__circle-item");

let startTime = Date.now();
let duration = 2200; // 5 сек – длительность анимации процентов

function updateProgress() {
  let elapsed = Date.now() - startTime;
  let progress = Math.min((elapsed / duration) * 100, 100);

  progressSpan.textContent = `${Math.round(progress)}%`;

  // ✅ Когда достигло 98% — добавляем класс load
  if (progress >= 98) {
    preloader.classList.add("load");
  }

  if (progress < 100) {
    requestAnimationFrame(updateProgress);
  } else {
    // ⏳ скрыть circle-item чуть позже
    setTimeout(() => {
      preloadItem.style.display = "none";
    }, 500);
  }
}

updateProgress();
