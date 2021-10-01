import { useState } from 'react';

import s from '../SearchForm/SearchForm.module.css';

export default function SearchForm({ onSubmit }) {
  const [movieName, setMovieName] = useState('');

  const handleNameChange = e => {
    setMovieName(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (movieName.trim() === '') {
      return;
    }

    onSubmit(movieName);
    setMovieName('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={s.searchForm}>
        <button type="submit" className={s.searchForm_button}>
          <span className={s.searchForm_button_label}>Search</span>
        </button>

        <input
          className={s.searchForm_input}
          type="text"
          placeholder="Search movies"
          value={movieName}
          onChange={handleNameChange}
          autoComplete="off"
          autoFocus
        />
      </form>
    </>
  );
}
