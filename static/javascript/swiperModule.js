let mainSwiper;
let gallerySwiper;

function initMainSwiper() {
  const isMobile = window.innerWidth <= 767;

  const swiperCubeConfig = {
    effect: "cube",
    allowTouchMove: isMobile,
    grabCursor: isMobile,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: isMobile ? 20 : 40,
      shadowScale: isMobile ? 0.94 : 0.6,
    },
    mousewheel: !isMobile,
    on: {
      slideChange: function () {
        const links = document.querySelectorAll(".Links li");
        links.forEach((link) => link.classList.remove("activeLink"));
        links[this.realIndex].classList.add("activeLink");

        if (this.realIndex === 4 && !gallerySwiper) {
          // Index of the gallery slide (0-based index)
          setTimeout(() => {
            gallerySwiper = initGallerySwiper();
          }); // Delay to allow slide transition to complete
        } else if (this.realIndex !== 4 && gallerySwiper) {
          gallerySwiper.destroy(true, true);
          gallerySwiper = null;
        }
      },
    },
  };

  // Initialize Swiper with cube configuration
  return new Swiper(".mySwiper", swiperCubeConfig);
}

function initGallerySwiper() {
  const gallerySwiperConfig = {
    effect: "coverflow",
    grabCursor: false,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 400,
      modifier: 1,
      slideShadows: true,
    },
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  // Initialize Swiper with gallery configuration
  return new Swiper(".gallery-swiper", gallerySwiperConfig);
}

// Initialize Main Swiper on page load
mainSwiper = initMainSwiper();

// Reinitialize Main Swiper on window resize
window.addEventListener("resize", function () {
  const activeIndex = mainSwiper.realIndex;
  mainSwiper.destroy(true, true); // Destroy existing instance
  gallerySwiper && gallerySwiper.destroy(true, true); // Destroy gallery swiper if it exists
  gallerySwiper = null;
  mainSwiper = initMainSwiper(); // Reinitialize Main Swiper
  mainSwiper.slideTo(activeIndex, 0); // Navigate to the correct slide
});

// Function to navigate to a specific slide index
window.Navigate = function (indx) {
  const links = document.querySelectorAll(".Links li");
  links.forEach((link) => link.classList.remove("activeLink"));
  links[indx].classList.add("activeLink");
  mainSwiper.slideTo(indx, 800, true);
};
