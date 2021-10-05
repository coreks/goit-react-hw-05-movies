import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieActors } from '../../services/moviesApi';
import { urlImage } from '../../constants/constants';

import s from '../Cast/Cast.module.css';

export default function Cast() {
  const [actors, setActors] = useState(null);

  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieActors(movieId).then(setActors);
  }, [movieId]);
  return (
    <>
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
    </>
  );
}
