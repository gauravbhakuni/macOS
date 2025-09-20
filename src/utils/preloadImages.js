// utils/preloadImages.js
export function preloadImages(imageUrls = []) {
  imageUrls.forEach((url) => {
    const img = new Image()
    img.src = url
  })
}
