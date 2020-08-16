let main = document.querySelector(".main");
let header = document.querySelector("header");
let path = document.currentScript.getAttribute("path");
// let before = document.querySelector("body:before");
let pathString = "url(" + path + ") left/cover no-repeat";
document.documentElement.style.setProperty("--backgroundPath", pathString);
console.log(pathString);

function resizeBackground() {
  let viewX = window.outerWidth;
  let viewY = window.outerHeight;
  document.documentElement.style.setProperty("--aboutHeight", viewY + "px");
  document.documentElement.style.setProperty("--aboutWidth", viewX + "px");
}

resizeBackground();

window.addEventListener("resize", resizeBackground);
