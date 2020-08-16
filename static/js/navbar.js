let menu = document.querySelector("nav .side i");
let panel = document.querySelector("nav ul");
let nav = document.querySelector("nav");
let subnav = document.querySelector(".subnav");
let foreground = document.querySelector(".foreground");
let background = document.querySelector(".background");
let offsety = 0;
let navDimensions = {
  mainBig: "10vh",
  mainSmall: "6vh",
  subBig: "8vh",
  subSmall: "0vh",
  panelWidth: "75vw",
};

// each of the three can be keep, big, or small.
let showNav = {
  scroll: "keep",
  mouse: "keep",
  action: "big",
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
      document.documentElement.style.setProperty("--navHeight", navDimensions.mainBig);
      if (subnav) {
        document.documentElement.style.setProperty("--subnavHeight", navDimensions.subBig);
      }
      break;
    case "small":
      document.documentElement.style.setProperty("--navHeight", navDimensions.mainSmall);
      if (subnav) {
        document.documentElement.style.setProperty("--subnavHeight", navDimensions.subSmall);
      }
      break;
    case "keep":
      break;
  }
  document.documentElement.style.setProperty("--navHeightMobile", navDimensions.mainBig);
}

let prevScrollpos = window.pageYOffset;
let prevDirection = "down";
let currentDirection = "up";
let directionChangePos = 0;

function checkScrollpos() {
  bigSmallNav();
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
}

let showSidePanel = true;
function showHideMenu(mode) {
  return function () {
    console.log(mode);
    if (x.matches) {
      panel.style.width = "44vw";
    } else {
      if (showSidePanel && mode == "toggle") {
        panel.style.width = navDimensions.panelWidth;
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

function checkWideMode() {
  let ratio = window.innerWidth / window.innerHeight;
  if (x.matches && ratio >= 2) {
    navDimensions = {
      mainBig: "5vw",
      mainSmall: "3vw",
      subBig: "3vw",
      subSmall: "0vw",
      panelWidth: "75vw",
    };
    // console.log("Desktop Wide");
  } else if (x.matches && ratio < 2) {
    navDimensions = {
      mainBig: "9vh",
      mainSmall: "6vh",
      subBig: "8vh",
      subSmall: "0vh",
      panelWidth: "75vw",
    };
    // console.log("Desktop Regular");
  } else if (!x.matches && ratio > 1.5) {
    navDimensions = {
      mainBig: "9vw",
      mainSmall: "6vw",
      subBig: "8vw",
      subSmall: "0vw",
      panelWidth: "33vw",
    };
    // console.log("Mobile Landscape");
  } else {
    navDimensions = {
      mainBig: "10vh",
      mainSmall: "6vh",
      subBig: "8vh",
      subSmall: "0vh",
      panelWidth: "75vw",
    };
    // console.log("Mobile Portrait");
  }
  showNav.scroll = "big";
  bigSmallNav();
}

menu.addEventListener("click", showHideMenu("toggle"));
foreground.addEventListener("click", showHideMenu("hide"));

let x = window.matchMedia("(min-width: 1281px)");
x.addListener(showHideMenu()); // Attach listener function on state changes
x.addListener(mouseOnNav); // Attach listener function on state changes
mouseOnNav();

window.addEventListener("resize", checkWideMode);
checkWideMode();

//Invoke scrollposition checker each 10ms.
let id = setInterval(checkScrollpos, 10);
