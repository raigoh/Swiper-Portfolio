let mainSwiper;
let gallerySwiper;
let animationTriggered = false;

function initMainSwiper() {
  const isMobile = window.innerWidth <= 767.98;

  const swiperCubeConfig = {
    effect: isMobile ? "slide" : "cube",
    allowTouchMove: isMobile,
    grabCursor: isMobile,
    cubeEffect: {
      shadow: !isMobile,
      slideShadows: !isMobile,
      shadowOffset: isMobile ? 10 : 40,
      shadowScale: isMobile ? 0.94 : 0.6,
    },
    mousewheel: !isMobile,
    passiveListeners: true,
    slidesPerView: isMobile ? 1 : "auto",
    spaceBetween: isMobile ? 10 : 30,
    speed: isMobile ? 300 : 800,
    on: {
      slideChange: function () {
        const links = document.querySelectorAll(".Links li");
        links.forEach((link) => link.classList.remove("activeLink"));
        links[this.realIndex].classList.add("activeLink");

        // Check if the current slide is the About Me slide (index 1)
        if (this.realIndex === 1) {
          animateSkillBars();
        } else {
          resetSkillBars();
        }

        if (this.realIndex === 4 && !gallerySwiper) {
          setTimeout(
            () => {
              gallerySwiper = initGallerySwiper();
            },
            isMobile ? 100 : 300
          );
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
    effect: isMobile ? "slide" : "coverflow",
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

function animateSkillBars() {
  if (animationTriggered) return;
  animationTriggered = true;
  const skillBars = document.querySelectorAll(".skill_bar");
  skillBars.forEach((bar, index) => {
    let target = bar.style.width;
    if (target) {
      bar.style.width = "0%";
      setTimeout(() => {
        bar.style.transition = "width 2s ease-out";
        bar.style.width = target;
      }, index * 500);
    } else {
    }
  });
}

function resetSkillBars() {
  animationTriggered = false;
  const skillBars = document.querySelectorAll(".skill_bar");
  skillBars.forEach((bar) => {
    bar.style.transition = "none";
    bar.style.width = "0%";
  });
}

// Initialize Main Swiper on page load
document.addEventListener("DOMContentLoaded", () => {
  mainSwiper = initMainSwiper();
});

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

// CV box flip functionality
document.addEventListener("DOMContentLoaded", function () {
  const cvBoxes = document.querySelectorAll(".cv_box");

  cvBoxes.forEach((box) => {
    box.addEventListener("click", function () {
      this.classList.toggle("flipped");
    });
  });
});
