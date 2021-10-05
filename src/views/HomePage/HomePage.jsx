import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../services/moviesApi';
import MoviesList from '../../components/MoviesList/MoviesList';
import PageHeading from '../../components/PageHeading/PageHeading';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <>
      <PageHeading text="Trending today" />

      <MoviesList movies={movies} />
    </>
  );
}
