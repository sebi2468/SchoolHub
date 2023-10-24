/* add box shadow when scrolling */

const header = document.querySelector('[data-header]');

function handleHeaderBoxShadow() {
  if (window.scrollY > 0) {
    header.style.boxShadow = "0 0 15px 0 rgba(0, 0, 0, .5)";
  } else {
    header.style.boxShadow = "none";
  }
}

/* add scroll event listeners */

window.addEventListener('scroll', handleHeaderBoxShadow);