let main = document.querySelector(".main");
let header = document.querySelector("header");
let path = document.currentScript.getAttribute("path");
// let before = document.querySelector("body:before");
let pathString = "url(" + path + ") left/cover no-repeat";
document.documentElement.style.setProperty("--backgroundPath", pathString);
console.log(pathString);
let firstBodyBackgroundResize = true;

function resizeBackground() {
  if (x.matches || firstBodyBackgroundResize) {
    let viewX = window.innerWidth;
    let viewY = window.innerHeight;
    document.documentElement.style.setProperty("--aboutHeight", viewY + "px");
    document.documentElement.style.setProperty("--aboutWidth", viewX + "px");
    console.log(viewX, viewY);
  }
  firstBodyBackgroundResize = false;
  // console.log("resize");
}

resizeBackground();

// do not resize background for mobiles because ugly browser behaviours
window.addEventListener("resize", resizeBackground);
x.addListener(resizeBackground); // Attach listener function on state changes
