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

// //Animations
// class Polygon {
//   constructor(equationsX, equationsY) {
//     this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
//     this.node.setAttribute("style", "fill:white; stroke: black; stroke-width:0.03; stroke-opacity: 0.5; opacity:0.7; transition: all 1s ease 0s;");
//     this.eqX = equationsX;
//     this.eqY = equationsY;
//     svg.appendChild(this.node);
//   }

//   update(a) {
//     // console.log(act);
//     // a = 3*a - 1.5;
    
//     if (a>0.5){
//       a = a*(-4)+2.5;
//     }
//     console.log(a);
//     // a = 1.5*a;
//     let s = Math.sin(Math.PI/3);
//     let c = 0.5 //sin(pi/3)
//     let o = Math.cos(a);
//     let i = Math.sin(a);
//     let x = [];
//     let y = [];
//     let points = ""
//     for (let w=0; w<3;w++){
//       x[w]=parseFloat(eval(this.eqX[w]));
//       y[w]=parseFloat(eval(this.eqY[w]));
//       points += x[w] + "," + y[w] + " ";
//     }
//     this.node.setAttribute("points", points);
//   };
// }

// let equationsX = [
//   ["(-c*a)*o-s*a*i", "(1-c*a)*o-(s*a)*i", "(c-c*a)*o-(s+s*a)*i"],
//   ["-a*o", "(c-a)*o-s*i", "(-c-a)*o-s*i"],
//   ["(-c*a)*o-(-s*a)*i", "(-c-c*a)*o-(s-s*a)*i", "(-1-c*a)*o-(-s*a)*i"],
//   ["(c*a)*o-(-s*a)*i", "(-1+c*a)*o-(-s*a)*i", "(-c+c*a)*o-(-s-s*a)*i"],
//   ["a*o", "(-c+a)*o-(-s)*i", "(c+a)*o-(-s)*i"],
//   ["(c*a)*o-(s*a)*i", "(1+c*a)*o-(s*a)*i", "(c+c*a)*o-(-s+s*a)*i"]
// ];

// let equationsY = [
//   ["(-c*a)*i+(s*a)*o", "(1-c*a)*i+(s*a)*o", "(c-c*a)*i+(s+s*a)*o"],
//   ["-a*i", "(c-a)*i+s*o", "(-c-a)*i+s*o"],
//   ["(-c*a)*i+(-s*a)*o", "(-c-c*a)*i+(s-s*a)*o", "(-1-c*a)*i+(-s*a)*o"],
//   ["(c*a)*i+(-s*a)*o", "(-1+c*a)*i+(-s*a)*o", "(-c+c*a)*i+(-s-s*a)*o"],
//   ["a*i", "(-c+a)*i+(-s)*o", "(c+a)*i+(-s)*o"],
//   ["(c*a)*i+(s*a)*o", "(1+c*a)*i+(s*a)*o", "(c+c*a)*i+(-s+s*a)*o"]
// ];

// let blades = []

// for (let i = 0; i<6; i++){
//   blades[i] = new Polygon(equationsX[i],equationsY[i]);
// }

//Animations
class Polygon {
  constructor(startRotation, translation) {
    this.node = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    this.startRot = startRotation*Math.PI/3;
    this.translates = translation;
    this.node.setAttribute("points", "0,0 0.5,0.866 -0.5,0.866");
    console.log(this.startRot);
    this.node.setAttribute("style", "fill:white; stroke: black; stroke-width:0.03; stroke-opacity: 0.5; opacity:0.7; transition: all 0.5s ease 0s;" );
    svg.appendChild(this.node);
  }

  update(a) {
    a = 1.5*a;
    let xtranslates = this.translates[0]*a*20; //have to multiply by 20 because transform doesnt seem to work with user units, so use % instead
    let ytranslates = this.translates[1]*a*20;
    let angle = this.startRot;
    this.node.style.transform = 
      " rotate(" + a + "rad) \
      translate(" + xtranslates + "%," + ytranslates + "%) \
      rotate(" + angle + "rad)";
  };
}

let startRotations = [0, 1, 2, 3, 4, 5]; //is used as n*pi/3
let translations = [[-1,0], [-0.5,-0.866], [0.5,-0.866], [1,0], [0.5,0.866], [-0.5,0.866]]; //0.5 is cos(pi/3) and 0.866 is sin(pi/3)
let blades = []

for (let i = 0; i<6; i++){
  blades[i] = new Polygon(startRotations[i],translations[i]);
}


//parallax background
function animateBackground(currentScrollPos){
  background.style.transform = "translate3d(0, -" + 0.5 * currentScrollPos + "px, 0)";
}

//squares animation
function animateSquares(act){
  let subitemSize = (window.innerHeight / 100) * 3 + 5;

  let animationStyle = {
  offx: [-1.5, -0.5, 0.5, 1.5, -1.5, -0.5, 0.5, 1.5, -1.5, -0.5, 0.5, 1.5, -1.5, -0.5, 0.5, 1.5],
  offy: [1.5, 1.5, 1.5, 1.5, 0.5, 0.5, 0.5, 0.5, -0.5, -0.5, -0.5, -0.5, -1.5, -1.5, -1.5, -1.5],
  speedx: [-0.6, -0.3, 0.4, 0.8, -0.5, -0.1, 0.3, 0.9, -0.8, -0.3, 0.2, 0.3, -0.8, -0.7, 0.4, 0.8],
  speedy: [0.8, 0.7, 0.5, 0.9, 0.5, 0.3, 0.2, 0.6, -0.3, -0.6, -0.2, -0.5, -0.6, -0.7, -0.9, -0.8],
  opacity: [0.4, 0.5, 0.6, 0.3, 0.5, 0.8, 0.2, 0.7, 0.6, 0.5, 0.9, 0.6, 0.2, 0.3, 0.5, 0.7],
};

  for (var i = 0; i < subitems.length; i++) {
    let posx = Math.round(animationStyle.offx[i] * subitemSize + animationStyle.speedx[i] * act * 0.15 * window.innerWidth - subitemSize/2);
    let posy = Math.round(
    animationStyle.offy[i] * subitemSize + animationStyle.speedy[i] * act * 0.2 * window.innerHeight - subitemSize/2);
    let opa = Math.round((-(1 - animationStyle.opacity[i]) * act + 0.8) * 100) / 100;
    subitems[i].style.transform = "translate3d(" + posx + "px," + posy + "px, 0)";
    subitems[i].style.opacity = opa;
    let size = Math.round((window.innerHeight * Math.abs(animationStyle.speedx[i]) * act * 0.005 + 3) * 100) / 100;
    subitems[i].style.width = size + "vh";
    subitems[i].style.height = size + "vh"; 
  }
}

function animateAll() {    
  // subboarder.style.transform = "translate3d(0, " + offsety + "px, 0)";
  let scrollableHeight = document.body.scrollHeight - window.innerHeight;
  let currentScrollPos = window.pageYOffset;
  let act = currentScrollPos / scrollableHeight; 
  animateBackground(currentScrollPos)
  animateSquares(act)
  for (let i = 0; i<6; i++){
    blades[i].update(act);
  }
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



