"use strict";

// Navbar
const mobileNavbar = document.querySelector(".mobile-navbar");
const mobileNavbarInner = document.querySelector(".mobile-navbar-inner");
const navBtn = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");

navBtn.addEventListener("click", openAndCloseNavbar);
mobileNavbarInner.addEventListener("click", openAndCloseNavbar);
overlay.addEventListener("click", openAndCloseNavbar);

function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  navBtn.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Theme Selection
const root = document.documentElement;
const themeDesktopToggleBtn = document.querySelector(".theme-toggle-desktop");
const toggleDesktopImage = themeDesktopToggleBtn.querySelector("img");
const themeMobileToggleBtn = document.querySelector(".theme-toggle-mobile");
const toggleMobileImage = themeMobileToggleBtn.querySelector("img");
const desktopLogo = document.querySelector("#logo img");
const mobileLogo = document.querySelector(".m-logo img");
const heroRotator = document.querySelector(".hero-rotator img");
const twitterIcon = document.querySelector(".twitter-icon img");
const linkedinIcon = document.querySelector(".linkedin-icon img");
const githubIcon = document.querySelector(".github-icon img");
const twitterIconMobile = document.querySelector(".twitter-icon-m img");
const linkedinIconMobile = document.querySelector(".linkedin-icon-m img");
const githubIconMobile = document.querySelector(".github-icon-m img");
const skillLines = document.querySelectorAll(".skill-line img");
const stars = document.querySelectorAll(".star img");
const projectCursorImage = document.querySelector(".project-cursor img");

function setDarkTheme() {
  root.style.setProperty("--background", "#121212");
  root.style.setProperty("--black", "#ffffff");
  root.style.setProperty("--white", "#000000");
  root.style.setProperty("--text-color", "#959595");
  themeDesktopToggleBtn.classList.toggle("dark");
  toggleDesktopImage.src = "assets/theme-l.svg";
  themeMobileToggleBtn.classList.toggle("dark");
  toggleMobileImage.src = "assets/theme-l.svg";
  desktopLogo.src = "assets/logo-d.png";
  mobileLogo.src = "assets/logo-d.png";
  heroRotator.src = "assets/frontend-d.png";
  twitterIcon.src = "assets/twitter-d.svg";
  linkedinIcon.src = "assets/linkedin-d.svg";
  githubIcon.src = "assets/github-d.svg";
  twitterIconMobile.src = "assets/twitter-d.svg";
  linkedinIconMobile.src = "assets/linkedin-d.svg";
  githubIconMobile.src = "assets/github-d.svg";
  projectCursorImage.src = "assets/link-d.svg";
  skillLines.forEach((line) => {
    line.src = "assets/skill-line-d.svg";
  });
  stars.forEach((star) => {
    star.src = "assets/star-d.svg";
  });
}

function setLightTheme() {
  root.style.setProperty("--background", "#fafafa");
  root.style.setProperty("--black", "#000000");
  root.style.setProperty("--white", "#ffffff");
  root.style.setProperty("--text-color", "#4d4d4d");
  themeDesktopToggleBtn.classList.toggle("dark");
  toggleDesktopImage.src = "assets/theme-d.svg";
  themeMobileToggleBtn.classList.toggle("dark");
  toggleMobileImage.src = "assets/theme-d.svg";
  desktopLogo.src = "assets/logo-l.png";
  mobileLogo.src = "assets/logo-l.png";
  heroRotator.src = "assets/frontend-l.png";
  twitterIcon.src = "assets/twitter-l.svg";
  linkedinIcon.src = "assets/linkedin-l.svg";
  githubIcon.src = "assets/github-l.svg";
  twitterIconMobile.src = "assets/twitter-l.svg";
  linkedinIconMobile.src = "assets/linkedin-l.svg";
  githubIconMobile.src = "assets/github-l.svg";
  projectCursorImage.src = "assets/link-l.svg";
  skillLines.forEach((line) => {
    line.src = "assets/skill-line-l.svg";
  });
  stars.forEach((star) => {
    star.src = "assets/star-l.svg";
  });
}

themeDesktopToggleBtn.addEventListener("click", function () {
  if (themeDesktopToggleBtn.classList.contains("dark")) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

themeMobileToggleBtn.addEventListener("click", function () {
  if (themeDesktopToggleBtn.classList.contains("dark")) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
});

// projects load more
const hiddenProjects = document.querySelectorAll(".hidden-project");
const hiddenNumbers = document.querySelectorAll(".hidden-number");
const hiddenPaths = document.querySelectorAll(".hidden-path");
const loadProjectBtn = document.querySelector(".load-project");

loadProjectBtn.addEventListener("click", function () {
  hiddenProjects.forEach(function (project) {
    project.classList.remove("hide");
    project.classList.add("show");
  });

  hiddenNumbers.forEach(function (number) {
    number.classList.remove("hide");
    number.classList.add("show");
  });

  hiddenPaths.forEach(function (path) {
    path.classList.remove("hide");
    path.classList.add("show");
  });

  loadProjectBtn.remove();
});

//progress bar
const pageProgressBar = document.querySelector(".pp-bar");
const pageBody = document.querySelector("body");
const bodyHeight = pageBody.getBoundingClientRect().height;

function updatePPBar() {
  let scrollDistance = -pageBody.getBoundingClientRect().top;
  let pageProgress = Math.floor(
    (scrollDistance / (bodyHeight - document.documentElement.clientHeight)) *
      100
  );
  pageProgressBar.style.height = `${pageProgress}%`;
}

window.addEventListener("scroll", updatePPBar);

// custom cursor
const projectCursor = document.querySelector(".project-cursor");
const projectCards = document.querySelectorAll(".project-card");

projectCards.forEach(function (card) {
  card.addEventListener("mousemove", setCursor);
  card.addEventListener("mouseleave", unsetCursor);
});

function setCursor(e) {
  projectCursor.classList.add("active");
  projectCursor.style.top = `${e.pageY}px`;
  projectCursor.style.left = `${e.pageX}px`;
}

function unsetCursor(e) {
  projectCursor.classList.remove("active");
}
