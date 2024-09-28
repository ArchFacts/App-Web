import React, { useState } from 'react';
import Input from '../components/input.jsx';
import Botao from '../components/botao.jsx';
import '../index.css';
import '../components/input.css';
import '../components/botao.css';
import '../components/imagem.css';
import SimpleHeader from '../components/simple_header.jsx';
import '../components/simple_header.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import Slider from 'react-slick';
import SimpleFooter from '../components/simple_footer.jsx';
import '../components/simple_footer.css'

function CadastroBeneficiario() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
  });

  const images = [
    "/assets/imgs/fundo_cadastro.avif",
    "/assets/imgs/fundo_cadastro2.png",
    "/assets/imgs/fundo_cadastro3.png"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <section className='tela'>
      <SimpleHeader/>
     <div className='content-area'>
      <div className='container-cadastro'>
        <div className='registro'>
          <div className='voltar_e_titulo'>
          <a href="/nivel-usuario"><div className='voltar'>Voltar
          </div></a>
          <h1 className='h1_registro'>Cadastro</h1>
          </div>
          <Input
            label="Nome:"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
          />
          <Input
            label="Telefone:"
            type="tel"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
          />
          <Input
            label="Email:"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <Input
            label="Senha:"
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
          />
          <Input
            label="Confirmação de Senha:"
            type="password"
            name="confirmacaoSenha"
            value={formData.confirmacaoSenha}
            onChange={handleChange}
          />
          <div className='botoes'>
          <a href="/"><Botao texto="Cadastrar" onClick={console.log('cadastro')} /> </a> 
          </div>
        </div>
        <div className='registro-imagem'>
        <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img className='imagem' src={image} alt={`Imagem ${index + 1}`} />
                </div>
              ))}
            </Slider>
        </div>
       
      </div>
      </div>
     <SimpleFooter/>
    </section>

  );
}

export default CadastroBeneficiario;