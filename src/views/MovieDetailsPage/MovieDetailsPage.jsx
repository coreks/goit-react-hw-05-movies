import { useState, useEffect, lazy, Suspense } from 'react';
import {
  NavLink,
  Route,
  useParams,
  useRouteMatch,
  useLocation,
  useHistory,
} from 'react-router-dom';

import { fetchMovieById } from '../../services/moviesApi';
import Button from '../../components/Button/Button';
import MoviesItem from '../../components/MoviesItem/MoviesItem';
import PageTitle from '../../components/PageTitle/PageTitle';

import s from '../MovieDetailsPage/MovieDetailsPage.module.css';

const Cast = lazy(() =>
  import('../Cast/Cast.jsx' /* webpackChunkName: 'cast-page' */),
);
const Reviews = lazy(() =>
  import('../Reviews/Reviews.jsx' /* webpackChunkName: 'rewiews-page' */),
);

export default function MovieDetailsView() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();

  const { url, path } = useRouteMatch();

  const location = useLocation();
  const history = useHistory();

  const handleGoBack = () => {
    location.state
      ? history.push(
          location.search
            ? location.state.from + location.search
            : location.state.from,
        )
      : history.push('/');
  };

  useEffect(() => {
    fetchMovieById(movieId).then(setMovie);
  }, [movieId]);

  return (
    <>
      <Button onClick={handleGoBack} text="Go Back" />

      <MoviesItem movie={movie} />

      <hr />

      <PageTitle text="Additional information" />

      <NavLink to={`${url}/cast`} className={s.link}>
        Cast
      </NavLink>

      <NavLink to={`${url}/reviews`} className={s.link}>
        Reviews
      </NavLink>

      <hr />

      <Suspense fallback={<div>LOADING...</div>}>
        <Route path={`${path}/cast`}>
          <Cast />
        </Route>

        <Route path={`${path}/reviews`}>
          <Reviews />
        </Route>
      </Suspense>
    </>
  );
}
