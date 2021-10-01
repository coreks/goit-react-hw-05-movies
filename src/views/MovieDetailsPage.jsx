import { useState, useEffect } from 'react';
import { NavLink, useParams, useRouteMatch } from 'react-router-dom';
import { fetchMovieById } from '../services/moviesApi';
import Cast from './Cast/Cast';
import Reviews from './Reviews';

export default function MovieDetailsView() {
  const { movieId } = useParams();

  const { url } = useRouteMatch();
  const urlImage = 'https://image.tmdb.org/t/p/w500';

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      {movie && (
        <>
          <img
            src={
              movie.poster_path !== null
                ? `${urlImage + movie.poster_path}`
                : 'https://cdn.browshot.com/static/images/not-found.png'
            }
            alt={movie.title ?? movie.name}
            width="350px"
            height="450px"
          />

          <h2>
            {movie.title ?? movie.name}
            <span>({new Date(movie.release_date).getFullYear()})</span>
          </h2>

          <p>User Score : {movie.vote_average}</p>

          <p>
            Overview: <span>{movie.overview}</span>
          </p>

          {movie.genres && (
            <p>Genres: {movie.genres.map(({ name }) => name).join(', ')}</p>
          )}

          <hr />

          <p>Additional information</p>

          <NavLink to={`${url}/cast`}>
            <Cast />
          </NavLink>

          <NavLink to={`${url}/reviews`}>
            <Reviews />
          </NavLink>
        </>
      )}
    </>
  );
}
