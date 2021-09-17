let main = document.querySelector(".main");
let header = document.querySelector("header");
let imagePath = document.currentScript.getAttribute("path");
// console.log(imagePath);
let imageX = 0;
let imageY = 0;
let mobileBackgroundResize = true;
let subitems = document.querySelectorAll(".subitem");
let subboarder = document.querySelector(".subboarder");
let background = document.querySelector(".background");
let svg = document.querySelector("svg");
svg.setAttribute("viewBox", "-2.5 -2.5 5 5");

//Animations
class Polygon {
  constructor(n, tot) {
    this.n = n;
    this.theta = 2*Math.PI/tot;
    let startPoint = [Math.cos(this.theta/2), Math.sin(this.theta/2)];
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.node.setAttribute("points", "0,0 " + startPoint[0] + "," + startPoint[1] + " " + startPoint[0] + "," + (-startPoint[1]));
    this.node.setAttribute("style", "fill:white; stroke: black; stroke-width:0.03; stroke-opacity: 0.5; opacity:0.7;" );
    svg.appendChild(this.node);
  }

  update(a) {
    this.node.style.transform = "rotate(" + a + "rad)  rotate(" + this.n*this.theta + "rad) translate(0," + (a*20) + "%)";
  };

  clear(){
    svg.removeChild(this.node);
  }
}

class Iris {
  constructor(){
    this.blades = [];
    this.n_blades = 0;
    let irisCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    irisCircle.setAttribute("r","1");
    irisCircle.setAttribute("style", "fill-opacity:0; stroke: black; stroke-width:0.03; stroke-opacity: 1;" );
    svg.appendChild(irisCircle);
  }

  init(startblades){
    if(startblades){
      this.n_blades = startblades;
    }
    
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i] = new Polygon(i,this.n_blades);
    }
  }

  update(a){
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i].update(a);
    }
  }

  clear(){
    for (let i = 0; i<this.n_blades; i++){
      this.blades[i].clear();
    }
    this.blades = [];
  }

  increse(){
    this.n_blades++;
  }
}

let iris = new Iris();
iris.init(5);

svg.addEventListener("click", function(){
  iris.clear();
  iris.increse();
  iris.init();
});

//parallax background
function animateBackground(currentScrollPos){
  background.style.transform = "translate3d(0, -" + 0.5 * currentScrollPos + "px, 0)";
}

function animateAll() {    
  // subboarder.style.transform = "translate3d(0, " + offsety + "px, 0)";
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



