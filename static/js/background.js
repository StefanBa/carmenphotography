let main = document.querySelector(".main");
let header = document.querySelector("header");
let imagePath = document.currentScript.getAttribute("path");
console.log(imagePath);
let imageX = 0;
let imageY = 0;
let mobileBackgroundResize = true;

function resizeBackground() {
  if (x.matches || mobileBackgroundResize) {
    let viewX = main.clientWidth;
    let viewY = main.clientHeight + header.clientHeight;
    if (window.innerHeight < viewY) {
      viewY = viewY - (viewY - window.innerHeight) / 2;
    }
    background.style.width = viewX + "px";
    background.style.height = viewY + "px";
    let ratio = imageX / imageY;
    let backgroundY = viewY;
    let backgroundX = Math.ceil(viewY * ratio);

    if (backgroundX < viewX) {
      backgroundX = viewX;
      backgroundY = Math.ceil(viewX / ratio);
      console.log("specialcase");
    }
    background.style.backgroundSize = backgroundX + "px " + backgroundY + "px";
    background.style.backgroundPosition = "center center";
    console.log("resized!");
  }
  mobileBackgroundResize = false;
}

let image = new Image();
image.onload = function () {
  imageX = this.width;
  imageY = this.height;
  resizeBackground();
};

image.src = imagePath;
background.style.background = "url('" + imagePath + "')";

//do not resize background for mobiles because ugly browser behaviours

window.addEventListener("resize", resizeBackground);
window.addEventListener("orientationchange", function (event) {
  mobileBackgroundResize = true;
  resizeBackground();
  // console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
});
