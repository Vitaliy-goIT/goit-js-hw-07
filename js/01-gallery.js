import { galleryItems } from './gallery-items.js';
// Change code below this line

// console.log(galleryItems);

// console.log(createGalleryEl(galleryItems));

const galleryContainer = document.querySelector('.gallery');
const galleryEl = createGalleryEl(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryEl);

galleryContainer.addEventListener('click', onGalleryElClick);

function createGalleryEl(pictures) {
  return pictures
    .map(({ preview, original, description }) => {
      return `
        <div class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </div>`;
    })
    .join('');
}

function onGalleryElClick(evt) {
  evt.preventDefault();
  if (!evt.target.classList.contains('gallery__image')) {
    return;
  }

  const bigImgUrl = evt.target.dataset.source;
  const instance = basicLightbox.create(`
    <img src="${bigImgUrl}" width="800" height="600">`);

  instance.show();

  if (instance.show() === true) {
    document.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        instance.close();
      }
    });
  } else {
    document.removeEventListener('keydown', event => {
      if (event.code === 'Escape') {
        instance.close();
      }
    });
  }
}
