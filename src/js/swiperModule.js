let mainSwiper;
let gallerySwiper;

function initMainSwiper() {
  const isMobile = window.innerWidth <= 767.98;

  const swiperCubeConfig = {
    effect: isMobile ? "slide" : "cube", // Use slide effect on mobile for better performance
    allowTouchMove: isMobile,
    grabCursor: isMobile,
    cubeEffect: {
      shadow: !isMobile, // Disable shadow on mobile
      slideShadows: !isMobile, // Disable slide shadows on mobile
      shadowOffset: isMobile ? 10 : 40,
      shadowScale: isMobile ? 0.94 : 0.6,
    },
    mousewheel: !isMobile,
    slidesPerView: isMobile ? 1 : "auto", // Show one slide at a time on mobile
    spaceBetween: isMobile ? 10 : 30, // Reduce space between slides on mobile
    speed: isMobile ? 300 : 800, // Faster transitions on mobile
    on: {
      slideChange: function () {
        const links = document.querySelectorAll(".Links li");
        links.forEach((link) => link.classList.remove("activeLink"));
        links[this.realIndex].classList.add("activeLink");

        if (this.realIndex === 4 && !gallerySwiper) {
          setTimeout(
            () => {
              gallerySwiper = initGallerySwiper();
            },
            isMobile ? 100 : 300
          ); // Shorter delay on mobile
        } else if (this.realIndex !== 4 && gallerySwiper) {
          gallerySwiper.destroy(true, true);
          gallerySwiper = null;
        }
      },
    },
  };

  return new Swiper(".mySwiper", swiperCubeConfig);
}

function initGallerySwiper() {
  const isMobile = window.innerWidth <= 767.98;

  const gallerySwiperConfig = {
    effect: isMobile ? "slide" : "coverflow", // Use slide effect on mobile
    grabCursor: false,
    allowTouchMove: false,
    centeredSlides: isMobile ? false : true,
    slidesPerView: isMobile ? 1 : "auto",
    spaceBetween: isMobile ? 10 : 30,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: isMobile ? 100 : 400,
      modifier: 1,
      slideShadows: !isMobile,
    },
    loop: true,
    autoplay: {
      delay: isMobile ? 3000 : 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  };

  return new Swiper(".gallery-swiper", gallerySwiperConfig);
}

// Initialize Main Swiper on page load
mainSwiper = initMainSwiper();

// Reinitialize Main Swiper on window resize with debounce
let resizeTimer;
window.addEventListener("resize", function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    const activeIndex = mainSwiper.realIndex;
    mainSwiper.destroy(true, true);
    gallerySwiper && gallerySwiper.destroy(true, true);
    gallerySwiper = null;
    mainSwiper = initMainSwiper();
    mainSwiper.slideTo(activeIndex, 0);
  }, 250);
});

// Function to navigate to a specific slide index
window.Navigate = function (indx) {
  const links = document.querySelectorAll(".Links li");
  links.forEach((link) => link.classList.remove("activeLink"));
  links[indx].classList.add("activeLink");
  mainSwiper.slideTo(indx, window.innerWidth <= 767.98 ? 300 : 800, true);
};

document.addEventListener("DOMContentLoaded", function () {
  const cvBoxes = document.querySelectorAll(".cv_box");

  cvBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  });
});

// skillbar Animate

// document.addEventListener("DOMContentLoaded", () => {
//   const skillBars = document.querySelectorAll(".skill_bar");

//   const animateSkillBars = () => {
//     skillBars.forEach((bar) => {
//       const target = bar.style.width;
//       bar.style.width = "0%";
//       setTimeout(() => {
//         bar.style.width = target;
//       }, 100);
//     });
//   };

//   // Use Intersection Observer to trigger animation when skills section is in view
//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           animateSkillBars();
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     { threshold: 0.5 }
//   );

//   const skillsSection = document.querySelector(".about_skill_box");
//   if (skillsSection) {
//     observer.observe(skillsSection);
//   }
// });
