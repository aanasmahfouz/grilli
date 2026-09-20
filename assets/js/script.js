'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    const speed = Number(parallaxItems[i].dataset.parallaxSpeed) || 1;
    const itemX = x * speed;
    const itemY = y * speed;
    parallaxItems[i].style.transform = `translate3d(${itemX}px, ${itemY}px, 0px)`;
  }

});

/**
 * TABLE RESERVATION FORM HANDLER
 */
const reservationForm = document.getElementById("reservation-form");
const reservationAlert = document.getElementById("reservation-alert");

if (reservationForm && reservationAlert) {
  reservationForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const nameInput = reservationForm.querySelector('input[name="name"]');
    const phoneInput = reservationForm.querySelector('input[name="phone"]');
    const personSelect = reservationForm.querySelector('select[name="person"]');
    const dateInput = reservationForm.querySelector('input[name="reservation-date"]');
    const timeSelect = reservationForm.querySelector('select[name="time"]');

    const name = nameInput ? nameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const person = personSelect ? personSelect.options[personSelect.selectedIndex].text : "2 Persons";
    const date = dateInput ? dateInput.value : "";
    const time = timeSelect ? timeSelect.value : "";

    if (!name || !phone) {
      reservationAlert.className = "reservation-alert error";
      reservationAlert.textContent = "Please provide your name and phone number to secure your table.";
      reservationAlert.style.display = "block";
      return;
    }

    reservationAlert.className = "reservation-alert success";
    reservationAlert.innerHTML = `<strong>Reservation Confirmed!</strong><br>Table for ${person} reserved for ${name}${date ? ' on ' + date : ''}${time ? ' at ' + time : ''}. A confirmation SMS has been dispatched to ${phone}.`;
    reservationAlert.style.display = "block";

    reservationForm.reset();
    setTimeout(() => {
      reservationAlert.style.display = "none";
    }, 9000);
  });
}

/**
 * NEWSLETTER SUBSCRIPTION HANDLER
 */
const newsletterForm = document.getElementById("newsletter-form");
const newsletterAlert = document.getElementById("newsletter-alert");

if (newsletterForm && newsletterAlert) {
  newsletterForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const emailInput = newsletterForm.querySelector('input[name="email_address"]');
    const email = emailInput ? emailInput.value.trim() : "";

    if (!email || !email.includes("@")) {
      newsletterAlert.className = "newsletter-alert error";
      newsletterAlert.textContent = "Please enter a valid email address.";
      newsletterAlert.style.display = "block";
      return;
    }

    newsletterAlert.className = "newsletter-alert success";
    newsletterAlert.innerHTML = `Thank you for subscribing! Your <strong>25% VIP voucher</strong> has been sent to ${email}.`;
    newsletterAlert.style.display = "block";

    newsletterForm.reset();
    setTimeout(() => {
      newsletterAlert.style.display = "none";
    }, 7000);
  });
}
