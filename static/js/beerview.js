const buttons = document.querySelectorAll("[data-carousel-button]")
let scale =      [1,  2, 2.5,  2.7, 2.5, 2.5,   3,   3]
let translateX = [0, 33, 10,  -5, -25,  18, -12, -33]
let translateY = [0,  6, 20,  25,  18, -20, -20,  -2]

let x = window.matchMedia("(min-width: 1171px)");
let viewY = 0;
let viewX = 0;
let heightRatio = 0;
let mobileBackgroundResize = true;

// let newIndex = 7

// document.documentElement.style.setProperty("--scale", scale[newIndex]);
// document.documentElement.style.setProperty("--translateX", translateX[newIndex] + "%");
// document.documentElement.style.setProperty("--translateY", translateY[newIndex] + "%");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const offset = button.dataset.carouselButton === "next" ? 1 : -1
        console.log("offset: ", offset)
        const slides = document.querySelector("[data-slides]")
        
        const activeSlide = slides.querySelector("[data-active]")
        let newIndex = [...slides.children].indexOf(activeSlide) + offset

        if(newIndex < 0) newIndex = slides.children.length -1
        if(newIndex >= slides.children.length) newIndex = 0

        slides.children[newIndex].dataset.active = true
        delete activeSlide.dataset.active

        document.documentElement.style.setProperty("--scale", scale[newIndex]);
        document.documentElement.style.setProperty("--translateX", translateX[newIndex] + "%");
        document.documentElement.style.setProperty("--translateY", translateY[newIndex] + "%");

    })
})

function resizeBackground() {
    if (x.matches) {
    viewX = document.documentElement.clientWidth;
    viewY = document.documentElement.clientHeight;
    heightRatio = viewY*viewY/viewX;
    widthRatio = Math.sqrt(viewX)*viewY;



    }else if(mobileBackgroundResize){
        viewX = window.innerWidth;
        viewY = window.innerHeight;
        heightRatio = viewY*viewY/viewX;
        widthRatio = Math.sqrt(viewX)*viewY;
        console.log("mobile")
        
    }

    // mobileBackgroundResize = false;

    document.documentElement.style.setProperty("--viewY", viewY + "px");
    document.documentElement.style.setProperty("--viewX", viewX + "px");
    document.documentElement.style.setProperty("--heightRatio", heightRatio + "px");
    document.documentElement.style.setProperty("--widthRatio", widthRatio + "px");
    console.log(viewX, viewY, heightRatio, widthRatio);
    // console.log(x)
    console.log(mobileBackgroundResize)
   

}

resizeBackground();

window.addEventListener("resize", resizeBackground);
window.addEventListener("orientationchange", function (event) {
    mobileBackgroundResize = true;
    // console.log("the orientation of the device is now " + event.target.screen.orientation.angle);
  });

