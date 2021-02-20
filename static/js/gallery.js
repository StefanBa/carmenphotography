let gallery = document.querySelector(".gallery");
let menu_a = document.querySelector(".wedding");
let menu_b = document.querySelector(".people");
let menu_c = document.querySelector(".world");
let pics_obj = JSON.parse(pics); //convert json string to js object

menu_a.addEventListener("click", updateGallery("a"), false);
menu_b.addEventListener("click", updateGallery("b"), false);
menu_c.addEventListener("click", updateGallery("c"), false);

let image = [];
let imageDiv = [];
let current = "a";

function imageFound(im, dv) {
  return function () {
    dv.appendChild(im);
    dv.setAttribute("style", "text-align: center; padding: 2vh 0;");
    im.setAttribute("style", "max-width: 100vw; max-height: 100vh; object-fit: contain");    
  };
}

function clearGallery() {
  while (gallery.firstChild) {
    gallery.removeChild(gallery.lastChild);
  }
}

function updateGallery(key) {
  return function () {
    let filteredPics = Object.values(pics_obj).filter(pic => pic.includes(key));
    filteredPics.sort();
    clearGallery();
    for (var i in filteredPics)  {
      imageDiv[i] = document.createElement("div");
      image[i] = new Image();
      image[i].addEventListener("load", imageFound(image[i], imageDiv[i]));
      image[i].addEventListener("error", () => console.log("Image not found!"+i));
      image[i].src = "/static/gallery/" + filteredPics[i] + "?v=" + image_version;
      gallery.appendChild(imageDiv[i]);
    }
  };
}

updateGallery("a")();
