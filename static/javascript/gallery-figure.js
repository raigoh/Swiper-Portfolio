document.addEventListener("DOMContentLoaded", function () {
  const figures = document.querySelectorAll(".gallery_images figure");
  const prevButton = document.querySelector(".pagination .prev");
  const nextButton = document.querySelector(".pagination .next");
  let currentIndex = 0;

  function showFigure(index) {
    figures.forEach((figure, i) => {
      if (i === index) {
        figure.classList.add("active");
      } else {
        figure.classList.remove("active");
      }
    });
  }

  prevButton.addEventListener("click", function () {
    currentIndex = currentIndex === 0 ? figures.length - 1 : currentIndex - 1;
    showFigure(currentIndex);
  });

  nextButton.addEventListener("click", function () {
    currentIndex = currentIndex === figures.length - 1 ? 0 : currentIndex + 1;
    showFigure(currentIndex);
  });

  // Initially show the first figure
  showFigure(currentIndex);
});
