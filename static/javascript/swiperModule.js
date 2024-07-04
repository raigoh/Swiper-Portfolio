const swiper = new Swiper(".mySwiper", {
  effect: "cube",
  allowTouchMove: false,
  grabCursor: false,
  cubeEffect: {
    shadow: true,
    slideShadows: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  mousewheel: true,
});

// Event listener for slide change in the main swiper
swiper.on("slideChange", function () {
  // Update active link in the navigation based on active index
  const links = document.querySelectorAll(".Links li");
  links.forEach((link) => link.classList.remove("activeLink"));
  links[swiper.activeIndex].classList.add("activeLink");
});

// Function to navigate to a specific slide index
function Navigate(indx) {
  const links = document.querySelectorAll(".Links li");
  links.forEach((link) => link.classList.remove("activeLink"));
  links[indx].classList.add("activeLink");
  swiper.slideTo(indx, 800, true);
}
