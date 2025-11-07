document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");

  const popupSuccess = document.querySelector(".popup-form.true");
  const popupError = document.querySelector(".popup-form.false");

  function showPopup(el) {
    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), 3000);
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);

    try {
      const response = await fetch("mail.php", {
        method: "POST",
        body: formData,
      });

      const result = await response.text();

      if (result.trim() === "SUCCESS") {
        showPopup(popupSuccess);
        form.reset();
      } else {
        showPopup(popupError);
      }
    } catch (error) {
      showPopup(popupError);
    }
  });
});
