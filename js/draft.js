import gallery from "../gallery-items.js";
// {
//     preview:
//     original:
//     description: 
//   },

  
//<li class="gallery__item">
  // <a
  //   class="gallery__link"
  //   href="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  // >
  //   <img
  //     class="gallery__image"
  //     src="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546__340.jpg"
  //     data-source="https://cdn.pixabay.com/photo/2010/12/13/10/13/tulips-2546_1280.jpg"
  //     alt="Tulips"
  //   />
  // </a>
//</li>
// event.stopPropagation();
const refs = {
    sectionGalery: document.querySelector('.js-gallery'),
    modal: document.querySelector('.lightbox'),
    boxImg: document.querySelector('.lightbox__image'),
    closeBtn: document.querySelector('[data-action="close-lightbox"]'),
    overLay: document.querySelector('.lightbox__overlay'),
  }
//   console.log(refs.sectionGalery);
//   console.log(refs.madal);
// console.log(refs.closeBtn);
console.log(refs.overLay);

// - Создание и рендер разметки по массиву данных и предоставленному шаблону.
  const createGallery = gallery.map(({original,preview,description}={})=>
`<li class="gallery__item">
    <a class="gallery__link"
      href="${original}">
      <img
        class="gallery__image"
        src="${preview}"
        data-source="${original}"
        alt="${description}"/>
    </a>
  </li>
`
).join('');

    // console.log(createGallery);

refs.sectionGalery.innerHTML=createGallery;

// - Реализация делегирования на галерее `ul.js-gallery` и получение `url` большого
//   изображения.

refs.sectionGalery.addEventListener('click', handleGalleryClick);

function handleGalleryClick(evt){
    evt.preventDefault()
    if(evt.target.nodeName !== "IMG") return;
    openModal(evt.target);
    
};

// - Открытие модального окна по клику на элементе галереи.

function openModal(target){
    console.dir(target)
    refs.modal.classList.add("is-open")
    pastModalAtribut(target)

    refs.closeBtn.addEventListener('click',modalClose);
    refs.overLay.addEventListener('click',closeOnOverlay);
    document.addEventListener('keydown',closeByEscape);
    document.addEventListener('keydown',flipPhoto);
}

// - Подмена значения атрибута `src` элемента `img.lightbox__image`.
function pastModalAtribut(target) {
    // console.dir(target)
    refs.boxImg.src=target.dataset.source;
    refs.boxImg.alt=target.alt
    // console.dir(refs.boxImg)
}


// - Закрытие модального окна по клику на кнопку
//   `button[data-action="close-lightbox"]`.
// - Очистка значения атрибута `src` элемента `img.lightbox__image`. Это необходимо
//   для того, чтобы при следующем открытии модального окна, пока грузится
//   изображение, мы не видели предыдущее.

function modalClose(){
    // console.log('close')
    refs.modal.classList.remove("is-open")
    refs.boxImg.src="";
    refs.boxImg.alt="";

    refs.closeBtn.removeEventListener('click',modalClose)
    refs.overLay.removeEventListener('click',modalClose)
    document.removeEventListener('keydown',closeByEscape);
    document.removeEventListener('keydown',flipPhoto);
}

// Additions
// - Закрытие модального окна по клику на `div.lightbox__overlay`.
// refs.overLay.addEventListener('click',closeOnOverlay)
function closeOnOverlay(){
    console.log('closeByOverlay')

     modalClose()
}

// - Закрытие модального окна по нажатию клавиши `ESC`.
function closeByEscape(evt){
    const ESC_KEY_CODE = 'Escape'
    if(evt.key=== ESC_KEY_CODE){
        modalClose()
        console.log('closeEscape')
        } 
}

// - Пролистывание изображений галереи в открытом модальном окне клавишами "влево"
//   и "вправо".

function flipPhoto (evt){
    const LEFT_KEY ='ArrowLeft';
    const RIGHT_KEY='ArrowRight';
    // console.log('left',evt.key===LEFT_KEY)
    // console.log('right',evt.key===RIGHT_KEY)
    let newIndex;
    const currentIndex = gallery.findIndex(a => a.original === refs.boxImg.src)
    // console.dir(currentIndex)
    if (evt.key===LEFT_KEY){
        newIndex=currentIndex-1;
        // console.log(newIndex)
            if(newIndex === -1){
                newIndex=gallery.length-1
    } }
else if (evt.key===RIGHT_KEY){
        newIndex=currentIndex+1;
            if(newIndex === gallery.length) {
                newIndex =0
            }
    }

    refs.boxImg.src = gallery[newIndex].original;
    }
// console.log(newIndex)
    // console.dir(gallery[newIndex])
    // console.dir( gallery[newIndex].original)