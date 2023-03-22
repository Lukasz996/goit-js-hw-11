import './css/styles.css';
import axios from 'axios';
import Notiflix from 'notiflix';
// import debounce from 'lodash.debounce';

// const BASE_URL = 'https://pixabay.com/api';
const API_KEY = "29601510-cb62b0e552e92b2824471424b";
const API_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
let page = 1;

loadMoreBtn.style.display = 'none';




Notiflix.Notify.warning("Sorry, there are no images matching your search query. Please try again.");