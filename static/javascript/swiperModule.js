function initSwiper() {
  const isMobile = window.innerWidth <= 767;

  const swiperConfig = {
    effect: "cube",
    allowTouchMove: false,
    grabCursor: false,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: isMobile ? 20 : 40,
      shadowScale: isMobile ? 0.94 : 0.6,
    },
    mousewheel: true,
  };

  // Initialize Swiper
  const swiper = new Swiper(".mySwiper", swiperConfig);

  // Event listener for slide change in the main swiper
  swiper.on("slideChange", function () {
    // Update active link in the navigation based on active index
    const links = document.querySelectorAll(".Links li");
    links.forEach((link) => link.classList.remove("activeLink"));
    links[swiper.activeIndex].classList.add("activeLink");
  });

  // Function to navigate to a specific slide index
  window.Navigate = function (indx) {
    const links = document.querySelectorAll(".Links li");
    links.forEach((link) => link.classList.remove("activeLink"));
    links[indx].classList.add("activeLink");
    swiper.slideTo(indx, 800, true);
  };

  return swiper;
}

// Initialize Swiper on page load
let swiper = initSwiper();

// Reinitialize Swiper on window resize
window.addEventListener("resize", function () {
  swiper.destroy(true, true); // Destroy existing instance
  swiper = initSwiper(); // Reinitialize Swiper
});
