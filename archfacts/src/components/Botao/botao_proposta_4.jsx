import React from 'react';
import styles from './botao_proposta4.module.css';

function BotaoProposta4({ texto, onClick, cor }) {
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

export default BotaoProposta4;