import { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Container from './components/Container/Container';
import AppBar from './components/AppBar/AppBar';

const AsyncHomePage = lazy(() =>
  import('./views/HomePage/HomePage.jsx' /* webpackChunkName: 'home-page' */),
);
const AsyncMoviesPage = lazy(() =>
  import(
    './views/MoviesPage/MoviesPage.jsx' /* webpackChunkName: 'movies-page' */
  ),
);
const AsyncMovieDetailsPage = lazy(() =>
  import(
    './views/MovieDetailsPage/MovieDetailsPage.jsx' /* webpackChunkName: 'movie-details-page' */
  ),
);
const AsyncNotFoundPage = lazy(() =>
  import(
    './views/NotFoundPage/NotFoundPage.jsx' /* webpackChunkName: 'not-found-page' */
  ),
);

function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<div>LOADING...</div>}>
        <Switch>
          <Route path="/" exact component={AsyncHomePage} />
          <Route path="/movies" exact component={AsyncMoviesPage} />
          <Route path="/movies/:movieId" component={AsyncMovieDetailsPage} />
          <Route component={AsyncNotFoundPage} />
        </Switch>
      </Suspense>

      <ToastContainer autoClose={2500} />
    </Container>
  );
}

export default App;
