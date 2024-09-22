import React from 'react';
import '../index.css';
import './botao.css'

function Botao({ texto, onClick }) {
  return (
    <div className='botao'>
    <button onClick={onClick}>
      {texto}
    </button></div>
  );
}

export default Botao;