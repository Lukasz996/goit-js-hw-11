import './css/styles.css';
import { getPicture } from './js/getPicture';
import axios from 'axios';
import Notiflix from 'notiflix';


const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const inputSearch = document.querySelector('[name="searchQuery"]');
const btn = document.querySelector('.btn');
const loadMore = document.querySelector('.load-more');
let totalImages;
let page = 1;
let query = '';

const handleChange = e => {
  query = e.target.value;
};

const hideLoadMore = () => {
  loadMore.className = 'load-more hidden';
};

const handleClick = async e => {
  e.preventDefault();
  hideLoadMore();
  page = 1;
  const data = await getPicture(page, query);
  createGallery(data.hits);
  const { total, totalHits } = data;
  if (total && totalHits) {
    totalImages = total;
    if (total - (page - 1) * 40 > 40) {
      loadMore.className = 'load-more';
    } else {
      loadMore.className = 'hidden';
    }
    Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  }
};

const createGallery = data => {
  const images = data
    .map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `
      <div class="photo-card">
      <a href=${largeImageURL}>
  <img src="${webformatURL}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes:</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views:</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments:</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads:</b>${downloads}
    </p>
  </div>
  </a>
  </div>
`;
    })
    .join(' ');
  gallery.innerHTML = images;
};

const handleLoadMore = async () => {
  if (
    totalImages - 
    page * 40 > 40) {
    loadMore.className = 'load-more';
  } else {
    loadMore.className = 'hidden';
    Notiflix.Notify.warning(
      `We're sorry, but you've reached the end of search results.`
    );
  }
  page++;
  const data = await getPicture(page, query);
  console.log(data);
  createGallery(data.hits);
  const { total } = data;
};

btn.addEventListener('click', handleClick);
handleChange && inputSearch.addEventListener('input', handleChange);

loadMore.addEventListener('click', handleLoadMore);










// import './css/styles.css';
// // import { getPicture } from './js/getPicture';
// import axios from 'axios';
// import Notiflix from 'notiflix';
// import { debounce } from 'lodash';
// import 'simplelightbox/dist/simple-lightbox.min.css'
// import simpleLightbox from 'simplelightbox';

// // import debounce from 'lodash.debounce';

// // const BASE_URL = 'https://pixabay.com/api';
// loadMoreBtn.style.display = 'none';

// const form = document.querySelector('#search-form');
// const gallery = document.querySelector('.gallery');
// const loadMoreBtn = document.querySelector('.load-more');
// const API_KEY = '29601510-cb62b0e552e92b2824471424b';
// const DEBOUNCE_TIME = 300;
// const SCROLL_MARGIN = 700;
// let lightbox = newSimpleLightbox('.gallery a');
// let page = 1;
// let totalHits = 0;
// let searchData = '';


// const getPicture = async (name, page = 1, per_page = 40) => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${API_KEY}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     console.log(response);
//   } catch (error) {
//     Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.")
//     return {}
//   }
// };

// // export { getPicture };



// const apiGallery = pictureArray => {
//   const markUp = pictureArray
//     .map(
//       picture =>
//         `<div class="photo-card">
//           <img src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
//           <div class="info">
//             <p class="info-item">
//               <span class="info-title"><b>Likes</b></span><span class="info-numbers">${picture.likes}</span>
//             </p>
//             <p class="info-item">
//               <span class="info-title"><b>Views</b></span><span class="info-numbers">${picture.views}</span>
//             </p>
//             <p class="info-item">
//               <span class="info-title"><b>Comments</b></span><span class="info-numbers">${picture.comments}</span>
//             </p>
//             <p class="info-item">
//               <span class="info-title"><b>Downloads</b></span><span class="info-numbers">${picture.downloads}</span>
//             </p>
//           </div>
//         </div>`
//     )
//     .join('');

//   gallery.insertAdjacentHTML('beforeend', markUp);
//   lightbox.refresh();
// };

// form.addEventListener('submit', (e) => {
//   e.preventDefault();
//   gallery.innerHTML = '';
//   const { search } = e.currentTarget;
//   searchData = search.value.trim();
//   getPicture(searchData, pageNumber)
//     .then(data => {
//       log(data);
//       if (data.hits.length === 0)
//         return Notiflix.Notify.warning(
//           'Sorry, there are no images matching to your search query.',
//           NotiflixOptions
//         );
//       apiGallery(data.hits);
//     })
//     .catch(err => console.log(err));
// });

// window.addEventListener(
//   'scroll',
//   debounce(() => {
//     const scrollable =
//       document.documentElement.scrollHeight - window.innerHeight;
//     const scrolled = window.scrollY;

//     if (scrolled > scrollable - SCROLL_MARGIN) {
//       pageNumber++;
//       getPicture(searchData, pageNumber)
//         .then(data => {
//           if (data.hits.length === 0)
//             return Notiflix.Notify.warning(
//               'Sorry, there are no more images matching your search query. Please try again.'
//             );
//           apiGallery(data.hits);
//         })
//         .then(console.log('refresh'))

//         .catch(err => console.log(err));
//     }
//   }, DEBOUNCE_TIME)
// );


// // getPicture('kittens').then(res => apiGallery(res.data.hits));

// // Notiflix.Notify.error("Sorry, there are no images matching your search query. Please try again.");
