import axios from 'axios';

const API_KEY = '1536e7dddf218c385f99496618571b3b';

const getMoviesByAxios = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  method: 'GET',
  status_code: '200',
});

export const fetchTrendingMovies = async () => {
  const {
    data: { results },
  } = await getMoviesByAxios(`
trending/movie/day?api_key=${API_KEY}`);
  return results;
};

export const fetchMovieById = async movieId => {
  const { data: results } = await getMoviesByAxios(
    `movie/${movieId}?api_key=${API_KEY}&language=en-US`,
  );
  return results;
};

export const fetchMovieActors = async movieId => {
  const { data: results } = await getMoviesByAxios(
    `movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`,
  );
  return results;
};

export const fetchMovieReviews = async movieId => {
  const { data: results } = await getMoviesByAxios(
    `movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`,
  );
  console.log(results);
  return results;
};

export const fetchMovieSearch = async query => {
  const {
    data: { results },
  } = await getMoviesByAxios(
    `search/movie?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`,
  );
  console.log(results);
  return results;
};
