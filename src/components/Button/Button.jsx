import s from '../Button/Button.module.css';

export default function Button({ onClick, text }) {
  return (
    <button className={s.button} onClick={onClick}>
      {text}
    </button>
  );
}
