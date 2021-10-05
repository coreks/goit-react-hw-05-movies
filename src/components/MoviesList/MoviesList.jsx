import { Link, useLocation } from 'react-router-dom';
import { urlImage } from '../../constants/constants';

import s from '../MoviesList/MoviesList.module.css';

export default function MoviesList({ movies }) {
  const location = useLocation();

  return (
    <>
      {movies && (
        <ul className={s.movies_list}>
          {movies.map(({ id, title, name, poster_path }) => (
            <li key={id}>
              <Link
                to={{
                  pathname: `/movies/${id}`,
                  state: { from: location },
                }}
              >
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
                <h2>{title ?? name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
