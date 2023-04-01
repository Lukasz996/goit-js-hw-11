import axios from 'axios';

const API_URL = 'https://pixabay.com/api';
const API_KEY = '29601510-cb62b0e552e92b2824471424b';
const PARAMS = `?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true&per_page=`;

export const fetchPicture = async (page, query) => {
  const endPoint =
    API_URL +
    `/?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${page}`;
  const response = await axios.get(endPoint);
  if (response.status != 200) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return {};
  }

  const { data } = response;
  return data;
};

// const API_KEY = '29601510-cb62b0e552e92b2824471424b';

// const getPicture = async (name, page = 1, per_page = 40) => {
//   try {
//     const response = await axios.get(
//       `https://pixabay.com/api/?key=${API_KEY}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`
//     );
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//   }
// };

// export { getPicture };

// import axios from 'axios';

// const API_KEY = '29601510-cb62b0e552e92b2824471424b';

// const getPicture = (name, page = 1, per_page = 40) => {
//   return axios.get(
//     `https://pixabay.com/api/?key=${API_KEY}&q=${name}&page=${page}&per_page=${per_page}&image_type=photo&orientation=horizontal&safesearch=true`).then(
//       res => console.log(res)
//       )

//     };

//     export { getPicture };

// const API_URL = `https://pixabay.com/api/?key=${API_KEY}&image_type=photo&orientation=horizontal&safesearch=true`;

// Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");

// .then(res => {
//   if (res.ok) {
//     return res.json();
//   }
//   throw new Error(res.status);
// })
// .catch(error => console.error('Error:', error));
