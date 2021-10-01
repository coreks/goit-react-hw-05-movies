import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchTrendingMovies } from '../../services/moviesApi';
import PageHeading from '../../components/PageHeading/PageHeading';

import s from '../HomePage/HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const urlImage = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      {movies && (
        <ul className={s.movies_gallery}>
          {movies.map(({ id, title, name, poster_path }) => (
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
                <h2>{title ?? name}</h2>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
