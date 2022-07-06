"use strict";

// Navbar
const mobileNavbar = document.querySelector(".mobile-navbar");
const navBtn = document.querySelector(".burger");
const overlay = document.querySelector(".overlay");

navBtn.addEventListener("click", openAndCloseNavbar);
overlay.addEventListener("click", openAndCloseNavbar);

function openAndCloseNavbar() {
  mobileNavbar.classList.toggle("active");
  navBtn.classList.toggle("active");
  overlay.classList.toggle("active");
}

// Theme Selection
const root = document.documentElement;
const themeToggleBtn = document.querySelector(".theme-toggle");
const toggleImage = themeToggleBtn.querySelector("img");
const rotatingCup = document.querySelector(".emma-image");
const tagBefore = document.querySelector(".tag-before");
const tagAfter = document.querySelector(".tag-after");
const contactImage = document.querySelector(".contact-image");
const projectImage = document.querySelector(".project-image.green-bg");

function setDarkTheme() {
  root.style.setProperty("--background", "rgba(0,0,0, 0.99)");
  root.style.setProperty("--text-black", "#ffffff");
  toggleImage.src = "assets/theme-2.svg";
  rotatingCup.classList.remove("light");
  rotatingCup.classList.add("dark");
  tagBefore.classList.remove("light");
  tagBefore.classList.add("dark");
  tagAfter.classList.remove("light");
  tagAfter.classList.add("dark");
  contactImage.classList.remove("light");
  contactImage.classList.add("dark");
  projectImage.classList.remove("light");
  projectImage.classList.add("dark");
  themeToggleBtn.classList.toggle("dark");
}

function setLightTheme() {
  root.style.setProperty("--background", "#ffffff");
  root.style.setProperty("--text-black", "#000000");
  toggleImage.src = "assets/theme-1.svg";
  rotatingCup.classList.add("light");
  rotatingCup.classList.remove("dark");
  tagBefore.classList.add("light");
  tagBefore.classList.remove("dark");
  tagAfter.classList.add("light");
  tagAfter.classList.remove("dark");
  contactImage.classList.add("light");
  contactImage.classList.remove("dark");
  projectImage.classList.add("light");
  projectImage.classList.remove("dark");
  themeToggleBtn.classList.toggle("dark");
}

themeToggleBtn.addEventListener("click", function () {
  if (themeToggleBtn.classList.contains("dark")) {
    setLightTheme();
  } else {
    setDarkTheme();
  }
});

rotatingCup.addEventListener("mouseover", changeColor);
rotatingCup.addEventListener("mouseout", changeColor1);

function changeColor() {
  rotatingCup.querySelector("img").src = "assets/emma-1.png";
}

function changeColor1() {
  rotatingCup.querySelector("img").src = "assets/emma.png";
}
