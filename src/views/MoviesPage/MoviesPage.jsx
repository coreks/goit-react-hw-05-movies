import { useState, useEffect } from 'react';
import { fetchMovieSearch } from '../../services/moviesApi';
import SearchForm from '../../components/SearchForm/SearchForm';
import s from '../MoviesPage/MoviesPage.module.css';
import { Link } from 'react-router-dom';

export default function MoviesPage() {
  const [movieName, setMovieName] = useState(null);
  const [movies, setMovies] = useState(null);

  const urlImage = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    if (!movieName) {
      return;
    }

    async function getMovies() {
      try {
        const movies = await fetchMovieSearch(movieName);

        if (movies.length === 0) {
          return;
        }

        setMovies(prevState => [...prevState, ...movies]);
      } catch (error) {
        console.error(error.message());
      }
    }

    getMovies();
  }, [movieName]);

  const handleFormSubmit = movieName => {
    setMovieName(movieName);
    setMovies([]);
  };

  return (
    <>
      <SearchForm onSubmit={handleFormSubmit} />

      {movies && (
        <ul className={s.movies_gallery}>
          {movies.map(({ id, name, title, poster_path }) => (
            <li key={id}>
              <Link to={`/movies/${id}`}>
                <img
                  src={
                    poster_path !== null
                      ? `${urlImage + poster_path}`
                      : 'https://cdn.browshot.com/static/images/not-found.png'
                  }
                  alt={title ?? name}
                  width="350px"
                  height="450px"
                />
                <h2>{title}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
