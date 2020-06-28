let menu = document.querySelector("nav .side i");
let panel = document.querySelector("nav ul");
let nav = document.querySelector("nav");
let subnav = document.querySelector(".subnav");
let foreground = document.querySelector(".foreground");
let background = document.querySelector(".background");
let offsety = 0;
let bigNavHeight = "10vh";
let smallNavHeight = "6vh";
let bigSubnavHeight = "height: 8vh";
let smallSubnavHeight = "height: 0vh";

// each of the three can be keep, big, or small.
let showNav = {
  scroll: "keep",
  mouse: "keep",
  action: "keep",
};

function parallax() {
  if (background) {
    background.style.transform = "translate3d(0, -" + offsety + "px, 0)";
  }
}

//makes Navbar bigger or smaller.
//When Mouseover, then make it big, else decide on scroll
function bigSmallNav() {
  // console.log("mouse: " + showNav.mouse + " scroll: " + showNav.scroll + " action: " + showNav.action);
  if (showNav.mouse == "big") {
    showNav.action = "big";
  } else {
    showNav.action = showNav.scroll;
  }
  switch (showNav.action) {
    case "big":
      document.documentElement.style.setProperty("--navHeight", bigNavHeight);
      if (subnav) {
        subnav.setAttribute("style", bigSubnavHeight);
      }
      break;
    case "small":
      document.documentElement.style.setProperty("--navHeight", smallNavHeight);
      if (subnav) {
        subnav.setAttribute("style", smallSubnavHeight);
      }
      break;
    case "keep":
      break;
  }
}

let prevScrollpos = window.pageYOffset;
let prevDirection = "down";
let currentDirection = "up";
let directionChangePos = 0;

function checkScrollpos() {
  let currentScrollPos = window.pageYOffset;

  if (currentScrollPos < prevScrollpos) {
    currentDirection = "up";
  } else if (currentScrollPos > prevScrollpos) {
    currentDirection = "down";
  }

  if (currentDirection != prevDirection) {
    directionChangePos = currentScrollPos;
  }

  if (currentScrollPos < directionChangePos - 200) {
    showNav.scroll = "big";
  } else if (currentScrollPos > directionChangePos + 200) {
    showNav.scroll = "small";
  } else {
    showNav.scroll = "keep";
  }

  prevScrollpos = currentScrollPos;
  prevDirection = currentDirection;

  offsety = 0.5 * currentScrollPos;
  window.requestAnimationFrame(parallax);
  bigSmallNav();
}

let showSidePanel = true;
function showHideMenu(mode) {
  return function () {
    console.log(mode);
    if (x.matches) {
      panel.style.width = "44vw";
    } else {
      if (showSidePanel && mode == "toggle") {
        panel.style.width = "75vw";
        menu.style.color = "black";
        showSidePanel = false;
      } else {
        panel.style.width = "0";
        menu.style.color = "grey";
        showSidePanel = true;
      }
    }
  };
}

function mouseOnNav() {
  //check if mouseover nav or subnav
  console.log("mousechecker");
  if (x.matches) {
    console.log("do mousecheck");
    nav.onmouseover = function () {
      showNav.mouse = "big";
    };
    nav.onmouseout = function () {
      showNav.mouse = "small";
    };
    if (subnav) {
      subnav.onmouseover = function () {
        showNav.mouse = "big";
      };
      subnav.onmouseout = function () {
        showNav.mouse = "small";
      };
    }
  } else {
    console.log("unbind");
    nav.onmouseover = null;
    nav.onmouseout = null;
    if (subnav) {
      subnav.onmouseover = null;
      subnav.onmouseout = null;
    }
  }
}

menu.addEventListener("click", showHideMenu("toggle"));
foreground.addEventListener("click", showHideMenu("hide"));

let x = window.matchMedia("(min-width: 1081px)");
x.addListener(showHideMenu()); // Attach listener function on state changes
x.addListener(mouseOnNav); // Attach listener function on state changes
mouseOnNav();
//Invoke scrollposition checker each 10ms.
let id = setInterval(checkScrollpos, 10);
