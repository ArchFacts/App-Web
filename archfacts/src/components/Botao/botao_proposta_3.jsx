import React from 'react';
import styles from './botao_proposta3.module.css';

function BotaoProposta({ texto, onClick, cor }) {
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

export default BotaoProposta;