import React from 'react';
import stylesCard from '../components/cards.module.css';
import SimpleHeader from '../components/Simple_Header/simple_header.jsx';
import SimpleFooter from '../components/Simple_Footer/simple_footer.jsx';
import stylesSimpleFooter from '../components/Simple_Footer/simple_footer.module.css';
import '../utils/global.css';
import '../../index.html';
import image1 from '../utils/assets/beneficiario.png';
import image2 from '../utils/assets/prestador.png';
import image3 from '../utils/assets/funcionario.png';

function NivelUsuario() {
  return (
    <div className={stylesCard.container}>
      <SimpleHeader />
      <div className={stylesCard.card_container}>
        <div className={stylesCard.card_absoluto}>
          <a href="/cadastrar/beneficiario" className={stylesCard.card}>
            <img src={image1} alt='Beneficiário' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>O beneficiário é para alguém que busca contratar serviços</div>
            <div className={stylesCard}></div>
            <button className={stylesCard.btn}>SOU UM BENEFICIÁRIO</button>
          </a>
          <a href="/cadastrar/prestador" className={stylesCard.card}>
            <img src={image2} alt='Prestador de Serviço' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>O prestador de serviço é para alguém que irá cadastrar e administrar uma empresa</div>
            <button className={stylesCard.btn}>SOU UM PRESTADOR DE SERVIÇO</button>
          </a>
          <a href="/cadastrar/funcionario" className={stylesCard.card}>
            <img src={image3} alt='Funcionário' className={stylesCard.card_image} />
            <div className={stylesCard.card_text}>O funcionário é para alguém que irá se vincular a uma empresa</div>
            <button className={stylesCard.btn}>SOU UM FUNCIONÁRIO</button>
          </a>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
}

export default NivelUsuario;