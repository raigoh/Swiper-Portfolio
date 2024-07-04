document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".gallery_images img");
  const prevBtn = document.querySelector(".prev");
  const nextBtn = document.querySelector(".next");
  let currentIndex = 0;

  function showImage(index) {
    images.forEach((img, idx) => {
      if (idx === index) {
        img.style.display = "block";
      } else {
        img.style.display = "none";
      }
    });
  }

  // Initial display
  showImage(currentIndex);

  // Previous button click handler
  prevBtn.addEventListener("click", function () {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
  });

  // Next button click handler
  nextBtn.addEventListener("click", function () {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
  });
});
