import React from 'react';
import styles from './botao_laranja_proposta.module.css';

function BotaoLaranja({ texto, onClick, cor }) {
  return (
    <div className={styles.botao}>
      <button 
        onClick={onClick} 
        className={styles.botao1} 
        style={{ backgroundColor: cor }} 
      >
        {texto}
      </button>
    </div>
  );
}

export default BotaoLaranja;