'use strict';

/* add event on multiple elements */

const addEventOnElement = (elements, eventType, callback) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/* navbar toggle for mobile */

const navbar = document.querySelector('[data-navbar]');
const navToggleBtn = document.querySelector('[data-nav-toggle-btn]');
const overlay = document.querySelector('[data-overlay]');
const navHeading = document.querySelector('[data-nav-heading]');

const toggleNavbar = () => {
  navbar.classList.toggle('active');
  navToggleBtn.classList.toggle('active');
  overlay.classList.toggle('active');
  navHeading.classList.toggle('active');
  document.body.classList.toggle('nav-active');
}

addEventOnElement([navToggleBtn, overlay], 'click', toggleNavbar);