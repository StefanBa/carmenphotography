let menu = document.querySelector("nav .side i");
let panel = document.querySelector("nav ul");
let nav = document.querySelector("nav");
let subnav = document.querySelector(".subnav");
let foreground = document.querySelector(".foreground");
let viewMode = "DesktopWide";
// let currentScrollPos = 0;
console.log("window.innerWidth = " + window.innerWidth);
console.log("window.devicePixelRatio = " + window.devicePixelRatio);

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


  // if (typeof animateIndex === "function") { 
  //   window.requestAnimationFrame(animateIndex);
  // }
}

let showSidePanel = true;
function showHideMenu(mode) {
  return function () {
    // console.log(mode);
    if (d.matches) {
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
  // console.log("mousechecker");
  if (x.matches) {
    // console.log("do mousecheck");
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
    // console.log("unbind");
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
    viewMode = "DesktopWide";
    navDimensions = {
      mainBig: "5vw",
      mainSmall: "3vw",
      subBig: "3vw",
      subSmall: "0vw",
      panelWidth: "33vw",
    };
  } else if (x.matches && ratio < 2) {
    viewMode = "DesktopRegular";
    navDimensions = {
      mainBig: "9vh",
      mainSmall: "6vh",
      subBig: "8vh",
      subSmall: "0vh",
      panelWidth: "33vw",
    };
  } else if (!x.matches && ratio > 1.5) {
    viewMode = "MobileLandscape";
    navDimensions = {
      mainBig: "9vw",
      mainSmall: "6vw",
      subBig: "8vw",
      subSmall: "0vw",
      panelWidth: "33vw",
    };
  } else {
    viewMode = "MobilePortrait";
    navDimensions = {
      mainBig: "10vh",
      mainSmall: "6vh",
      subBig: "8vh",
      subSmall: "0vh",
      panelWidth: "75vw",
    };
  }
  // console.log(viewMode);
  showNav.scroll = "big";
  bigSmallNav();
}

menu.addEventListener("click", showHideMenu("toggle"));
foreground.addEventListener("click", showHideMenu("hide"));

let x = window.matchMedia("(min-width: 1171px)");
let d = window.matchMedia("(min-width: 1499px)");
// let d = window.matchMedia("(min-width: 1601px) , (min-width: 801px) and (-webkit-min-device-pixel-ratio: 2)");
d.addListener(showHideMenu()); // Attach listener function on state changes
x.addListener(showHideMenu()); // Attach listener function on state changes
d.addListener(mouseOnNav); // Attach listener function on state changes
x.addListener(mouseOnNav); // Attach listener function on state changes

window.addEventListener("resize", checkWideMode);
checkWideMode();
mouseOnNav();

//Invoke scrollposition checker each 10ms.
let idNav = setInterval(checkScrollpos, 100);
