import { urlImage } from '../../constants/constants';

import s from '../MoviesItem/MoviesItem.module.css';

export default function MoviesItem({ movie }) {
  return (
    movie && (
      <div className={s.film_card}>
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
        <div className={s.film_description}>
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
        </div>
      </div>
    )
  );
}
