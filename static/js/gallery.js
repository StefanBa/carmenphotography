let gallery = document.querySelector(".gallery");
let menu_a = document.querySelector(".wedding");
let menu_b = document.querySelector(".people");
let menu_c = document.querySelector(".world");

menu_a.addEventListener("click", updateGallery("a"), false);
menu_b.addEventListener("click", updateGallery("b"), false);
menu_c.addEventListener("click", updateGallery("c"), false);

let image = [];
let imageDiv = [];

function imageFound(im, dv) {
  return function () {
    console.log("Image found!");
    dv.appendChild(im);
    let h = im.height;
    let w = im.width;
    if (h > w) {
      im.setAttribute("style", "object-fit: contain; height: 100%");
      dv.setAttribute("style", "min-width: 75vw; text-align: center; padding: 2vh 0");
    } else {
      im.setAttribute("style", "object-fit: contain; width: 100%; ");
      dv.setAttribute("style", "width: 100vw; text-align: center; padding: 2vh 0");
    }
    gallery.appendChild(dv);
  };
}

function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.lastChild);
    console.log("remove div");
  }
}

function updateGallery(key) {
  return function () {
    console.log("update Gallery");
    clearGallery();
    for (i = 1; i < 100; i++) {
      imageDiv[i] = document.createElement("div");
      // imageDiv[i].setAttribute("style", "height: 75vh ; width: 100vw");
      // imageDiv[i].setAttribute("style", " max-height: 75vh; border: 3px solid blue");
      image[i] = new Image();
      image[i].addEventListener("load", imageFound(image[i], imageDiv[i]));
      image[i].addEventListener("error", () => console.log("Image not found!"));
      image[i].src = "/static/gallery/" + key + i + ".jpg";
    }
  };
}
updateGallery("a")();
