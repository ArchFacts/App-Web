import React from 'react';
import stylesCard from '../../components/cards.module.css';
import SimpleHeader from '../../components/Simple-Header/simple_header.jsx';
import SimpleFooter from '../../components/Simple-Footer/simple_footer.jsx';
import '../../utils/global.css';
import image1 from '../../utils/assets/beneficiario.png';
import image2 from '../../utils/assets/prestador.png';
import image3 from '../../utils/assets/funcionario.png';

function NivelUsuario() {
  return (
    <div className={stylesCard.container}>
      <SimpleHeader />
      <div className={stylesCard.card_container}>
        <div className={stylesCard.card_absoluto}>
          <a href="/cadastrar/beneficiario" className={stylesCard.card}>
            <img src={image1} alt='Beneficiário' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>Interessado em um dos nossos parceiros? Clique aqui!</div>
            <div className={stylesCard}></div>
            <button className={stylesCard.btn}>Sou um beneficiário</button>
          </a>
          <a href="/cadastrar/prestador" className={stylesCard.card}>
            <img src={image2} alt='Prestador de Serviço' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>Quer administrar seu negócio com a gente? Clique aqui!</div>
            <button className={stylesCard.btn}>Sou um prestador de serviços</button>
          </a>
          <a href="/cadastrar/funcionario" className={stylesCard.card}>
            <img src={image3} alt='Funcionário' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>Trabalha com um de nossos parceiros? Clique aqui!</div>
            <button className={stylesCard.btn}>Sou um funcionário</button>
          </a>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}

export default NivelUsuario;