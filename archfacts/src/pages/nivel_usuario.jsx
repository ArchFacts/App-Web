import React from 'react';
import '../components/cards.css';
import SimpleHeader from '../components/simple_header.jsx';
import SimpleFooter from '../components/simple_footer.jsx';
import '../components/simple_footer.css'
import '../index.css'

function NivelUsuario() {
  return (
    <div className='container'>
      <SimpleHeader />
      <div className="card-container">
        <a href="/cadastrar/beneficiario" className='card'>
          <img src='../assets/imgs/beneficiario.png' alt='Beneficiário' className="card-image" />
          <button className="btn">SOU UM BENEFICIÁRIO</button>
        </a>
        <a href="/cadastrar/prestador" className='card'>
          <img src='../assets/imgs/prestador.png' alt='Prestador de Serviço' className="card-image" />
          <button className="btn">SOU UM PRESTADOR DE SERVIÇO</button>
        </a>
        <a href="/cadastrar/funcionario" className='card'>
          <img src='../assets/imgs/funcionario.png' alt='Funcionário' className="card-image" />
          <button className="btn">SOU UM FUNCIONÁRIO</button>
        </a>
      </div>
      <SimpleFooter />
    </div>
  );
}

export default NivelUsuario;