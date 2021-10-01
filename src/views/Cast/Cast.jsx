import { useState, useEffect } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { fetchMovieActors } from '../../services/moviesApi';

import s from '../Cast/Cast.module.css';

export default function Cast() {
  const [actors, setActors] = useState(null);

  const { movieId } = useParams();
  const { url } = useRouteMatch();

  const urlImage = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchMovieActors(movieId).then(setActors);
  }, [movieId]);
  return (
    <>
      <p>Cast</p>
      <Route path={`${url}/cast`}>
        {actors && (
          <ul className={s.cast}>
            {actors.cast.map(({ id, name, profile_path, character }) => (
              <li key={id}>
                <img
                  src={
                    profile_path !== null
                      ? `${urlImage + profile_path}`
                      : 'https://cdn.browshot.com/static/images/not-found.png'
                  }
                  alt={name}
                  width="250px"
                  height="375px"
                />
                <h3>{name}</h3>
                <p>{character}</p>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
}
