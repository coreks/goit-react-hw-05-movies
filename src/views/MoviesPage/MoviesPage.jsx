import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchMovieSearch } from '../../services/moviesApi';
import { toast } from 'react-toastify';
import SearchForm from '../../components/SearchForm/SearchForm';
import MoviesList from '../../components/MoviesList/MoviesList';

import 'react-toastify/dist/ReactToastify.css';

export default function MoviesPage() {
  const [movieName, setMovieName] = useState('');
  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (!movieName) {
      return;
    }

    async function getMovies() {
      const movies = await fetchMovieSearch(movieName);
      if (!movies.length) {
        return toast.error(
          `Movie with the name ${movieName} is not in the catalog`,
        );
      }

      setMovies(prevState => [...prevState, ...movies]);
    }

    getMovies();
  }, [movieName]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    const searchQuery = new URLSearchParams(location.search).get('query');

    setMovieName(searchQuery);
  }, [location.search]);

  const handleFormSubmit = newMovieName => {
    if (movieName === newMovieName) {
      return;
    }

    history.push({
      ...location,
      search: `query=${newMovieName}`,
      state: location,
    });

    setMovieName(newMovieName);
    setMovies([]);
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />

      <MoviesList movies={movies} />
    </>
  );
}
