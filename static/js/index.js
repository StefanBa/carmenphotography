import Iris from './Iris.js'

let main = document.querySelector(".main");
let header = document.querySelector("header");
let imagePath = document.getElementById('myscript').getAttribute("path");
let imageX = 0;
let imageY = 0;
let mobileBackgroundResize = true;
let background = document.querySelector(".background");
let svg = document.querySelector("svg");
svg.setAttribute("viewBox", "-2.5 -2.5 5 5");

let iris = new Iris(svg);
iris.init(9);

svg.addEventListener("click", function(){
  iris.clear();
  iris.changeblades(1);
  iris.init();
});

svg.addEventListener("contextmenu", function(ev){
  ev.preventDefault(); //don't show context menu
  iris.clear();
  iris.changeblades(-1);
  iris.init();
});

//parallax background
function animateBackground(currentScrollPos){
  background.style.transform = "translate3d(0, -" + 0.5 * currentScrollPos + "px, 0)";
}

function animateAll() {    
  let scrollableHeight = document.body.scrollHeight - window.innerHeight;
  let currentScrollPos = window.pageYOffset;
  let act = currentScrollPos / scrollableHeight; 
  animateBackground(currentScrollPos)
  iris.update(act);
}

let idIndex = setInterval(animateAll, 10);

//Backgroundimage always full bleed
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
      // console.log("specialcase");
    }
    background.style.backgroundSize = backgroundX + "px " + backgroundY + "px";
    background.style.backgroundPosition = "center center";
    // console.log("resized!");
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
  // console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
});



