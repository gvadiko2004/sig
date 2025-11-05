document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll(".portfolio-blocks__item-resp");

  blocks.forEach((block) => {
    const foreign = block.closest("foreignObject");
    if (!foreign) return;

    const width = block.offsetWidth + 4;  // компенсация 4px (по желанию)
    const height = block.offsetHeight;

    foreign.setAttribute("width", width);
    foreign.setAttribute("height", height);

    // Центровка относительно круга (0,0 внутри g)
    foreign.setAttribute("x", -(width / 2));
    foreign.setAttribute("y", -(height + 12)); // отступ сверху от круга
  });
});
