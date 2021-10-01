import { useState, useEffect } from 'react';
import { Route, useParams, useRouteMatch } from 'react-router-dom';
import { fetchMovieReviews } from '../services/moviesApi';

export default function Reviews() {
  const [rewiews, setReviews] = useState(null);
  const { movieId } = useParams();
  const { url } = useRouteMatch();

  useEffect(() => {
    fetchMovieReviews(movieId).then(setReviews);
  }, [movieId]);
  return (
    <>
      <p>Reviews</p>

      <Route path={`${url}/reviews`}>
        {rewiews && (
          <ul>
            {rewiews.results.map(({ id, author, content }) => (
              <li key={id}>
                <h3>{author}</h3>
                <p>{content}</p>
              </li>
            ))}
          </ul>
        )}
      </Route>
    </>
  );
}
