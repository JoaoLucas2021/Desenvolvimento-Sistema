// Scroll suave para o formulário
document.addEventListener("DOMContentLoaded", function () {
  const scrollBtn = document.querySelector(".scroll-btn");

  if (scrollBtn) {
    scrollBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector("#formPeneira");

      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      } else {
        alert("O formulário ainda não foi adicionado à página.");
      }
    });
  }
});