function editNav() {
  let x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose=document.querySelectorAll(".close")

// launch modal form
const  launchModal=e=>modalBg.style.display = "block";

// launch modal form
const  closeModal=e=>modalBg.style.display="none";


// launch modal event
modalBtn.forEach(elem => elem.onclick=launchModal );

// launch modal close event
modalClose.forEach(elem => elem.onclick= closeModal);
