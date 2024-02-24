"use strict";

const btnApplyNow = document.querySelectorAll(".openmodel-btn"),
  btnCloseModel = document.querySelectorAll(".close-model"),
  hiddenModel = document.querySelector(".model"),
  hiddenOverlay = document.querySelector(".overlay"),
  btnAppointment = document.querySelector(".appointment-btn"),
  appointmentModel = document.querySelector(".appointment"),
  btnGetStarted = document.querySelector(".btn-getstarted"),
  navigation = document.getElementById("navigation"),
  navLinks = document.querySelectorAll(".nav-link"),
  heroSection = document.querySelector(".hero-section"),
  allSections = document.querySelectorAll("section"),
  operationTabs = document.querySelectorAll(".operation-tab button"),
  operationContent = document.querySelectorAll(".opreation-content"),
  tabContainer = document.querySelector(".operation-tab"),
  slides = document.querySelectorAll(".slide"),
  dotsContainer = document.querySelector(".dots"),
  rightButton = document.querySelector(".right-button"),
  leftButton = document.querySelector(".left-button");

//open and close model
const openModel = function (e) {
  e.preventDefault();
  hiddenModel.classList.remove("hidden");
  hiddenOverlay.classList.remove("hidden");
};

const closeModel = function (e) {
  e.preventDefault();
  hiddenModel.classList.add("hidden");
  appointmentModel.classList.add("hidden");
  hiddenOverlay.classList.add("hidden");
};

btnApplyNow.forEach((btn) => btn.addEventListener("click", openModel));
btnCloseModel.forEach((btn) => btn.addEventListener("click", closeModel));
hiddenOverlay.addEventListener("click", closeModel);

btnAppointment.addEventListener("click", () => {
  appointmentModel.classList.remove("hidden");
  hiddenOverlay.classList.remove("hidden");
});

// scrolling
// navigation
const navSectionHeight = navigation.getBoundingClientRect().height;
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) navigation.classList.add("nav-active");
  else navigation.classList.remove("nav-active");
};

const heroSectionObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navSectionHeight}px`,
});
heroSectionObserver.observe(heroSection);

// section scroll
const removeActive = function () {
  navLinks.forEach((nav) => {
    nav.classList.remove("navlink_active");
  });
};

document.querySelector(".navbar-nav").addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    removeActive();
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
    e.target.classList.add("navlink_active");
  }
});

window.onscroll = () => {
  allSections.forEach((section) => {
    let scroll = window.scrollY + 5;
    let sectionHeight = section.offsetHeight;
    let offsetTop = section.offsetTop;
    let id = section.getAttribute("id");

    if (scroll >= offsetTop && scroll < offsetTop + sectionHeight) {
      removeActive();
      document
        .querySelector(`.nav-link[href*='${id}']`)
        .classList.add("navlink_active");
    }
  });
};

//get started
btnGetStarted.addEventListener("click", (e) => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

//gallery tabebd component
tabContainer.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operation-tab button");
  //gaurd clause
  if (!clicked) return;
  operationTabs.forEach((tab) => tab.classList.remove("tab-active"));
  clicked.classList.add("tab-active");

  operationContent.forEach((content) =>
    content.classList.add("operation-inactive")
  );
  document
    .querySelector(`.opreation-content-${clicked.dataset.tab}`)

    .classList.remove("operation-inactive");
});

//slider

let currSlide = 0;
const maxSlide = slides.length;

// console.log(dots);

const createDots = () => {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dot" data-slide="${i}"></button>`
    );
  });
};

createDots();

const activateDot = (currSlide) => {
  document
    .querySelectorAll(".dot")
    .forEach((dot) => dot.classList.remove("active-dot"));
  document
    .querySelector(`.dot[data-slide="${currSlide}"]`)
    .classList.add("active-dot");
};

activateDot(currSlide);

const goto = function (currSlide) {
  slides.forEach(
    (slide, i) =>
      (slide.style.transform = `translateX(${100 * (i - currSlide)}%)`)
  );
};

goto(0);
// 0%, 100%, 200%, 300%

const nextSlide = function () {
  if (currSlide === maxSlide - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goto(currSlide);
  activateDot(currSlide);
  //-100%, 0 , 100%, 200%
};

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlide - 1;
  } else {
    currSlide--;
  }
  goto(currSlide);
  activateDot(currSlide);
};

// right button
rightButton.addEventListener("click", nextSlide);

// left button
leftButton.addEventListener("click", prevSlide);

//arrow key
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    nextSlide();
  }
  if (e.key === "ArrowLeft") {
    prevSlide();
  }
});

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    const { slide } = e.target.dataset;
    console.log(slide);
    goto(slide);
    activateDot(slide);
  }
});
