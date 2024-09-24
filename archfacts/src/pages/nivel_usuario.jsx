import React from 'react';
import '../components/cards.css';
import SimpleHeader from '../components/simple_header.jsx';

function NivelUsuario() {
  return (
    <div className='container'>
      <SimpleHeader />
      <div className="card-container">
        <a href="/cadastrar">
        <div className="card">
          <button className="btn">SOU UM BENEFICIÁRIO</button>
        </div>
        </a>
        <div className="card">
          <button className="btn">SOU UM PRESTADOR DE SERVIÇO</button>
        </div>

        <div className="card">
          <button className="btn">SOU UM FUNCIONÁRIO</button>
        </div>
      </div>
      <div className='div_footer'>
            <footer>
              <p className='texto_footer'>
            © 2024 ArchFacts all rights reserved.</p>
            </footer>
        </div>
    </div>
  );
}

export default NivelUsuario;