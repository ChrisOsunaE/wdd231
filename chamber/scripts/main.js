document.addEventListener("DOMContentLoaded", function () {
  const hamburger = document.querySelector(".hamburger");

  const nav = document.querySelector("nav");

  hamburger.addEventListener("click", function () {
    this.classList.toggle("active");

    nav.classList.toggle("active");
  });
});
