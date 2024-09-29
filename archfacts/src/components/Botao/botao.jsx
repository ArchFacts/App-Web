import React from 'react';
import styles from './botao.module.css';

function Botao({ texto, onClick }) {
  return (
    <div className={styles.botao}>
    <button onClick={onClick}>
      {texto}
    </button></div>
  );
}

export default Botao;