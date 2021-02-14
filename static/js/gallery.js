let gallery = document.querySelector(".gallery");
let menu_a = document.querySelector(".wedding");
let menu_b = document.querySelector(".people");
let menu_c = document.querySelector(".world");

menu_a.addEventListener("click", updateGallery("a"), false);
menu_b.addEventListener("click", updateGallery("b"), false);
menu_c.addEventListener("click", updateGallery("c"), false);

let image = [];
let imageDiv = [];
let current = "a";

function imageFound(im, dv) {
  return function () {
    console.log("Image found: " + im.src);
    dv.appendChild(im);
    let h = im.height;
    let w = im.width;
    if (h > w) {
      dv.setAttribute("style", "width: 75vw; text-align: center; padding: 2vh 0;");
    } else {
      dv.setAttribute("style", "width: 100vw; text-align: center; padding: 2vh 0;");
    }
    im.setAttribute("style", "width: 100%; max-height: 100%; height: auto; object-fit: cover");
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
      image[i] = new Image();
      image[i].addEventListener("load", imageFound(image[i], imageDiv[i]));
      image[i].addEventListener("error", () => console.log("Image not found!"));
      image[i].src = "/static/gallery/" + key + i + ".jpg?v=" + image_version;
      gallery.appendChild(imageDiv[i]);
    }
  };
}

updateGallery("a")();
