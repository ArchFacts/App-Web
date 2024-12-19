import React from 'react';
import styles from './botao.module.css';

function Botao({ texto, onClick, disabled, style }) {
  return (
    <div className={styles.botao}>
      <button className={styles.button}
        onClick={onClick}
        disabled={disabled}
        style={style}
        type='submit'
      >
        {texto}
      </button>
    </div>
  );
}

export default Botao;