let imageIndex = 0;
let images = [
  "cute-img.jpg",
  "cute.jpg",
  "cute1.jpg",
  "cute2.jpg",
  "cute3.jpg",
  "cute5.jpg",
  "cute6.jpg",
];

function getRandomImage() {
  const filteredImages = images.filter((image) => image.startsWith("c"));
  const randomIndex = Math.floor(Math.random() * filteredImages.length);
  return filteredImages[randomIndex];
}

function changePhoto() {
  const cuteImage = document.getElementById("cute-image");
  const newImageUrl = `/images/${getRandomImage()}`;
  cuteImage.src = newImageUrl;
}

window.onload = () => {
  changePhoto();
  setInterval(changePhoto, 1000 * 60 * 10);
};
