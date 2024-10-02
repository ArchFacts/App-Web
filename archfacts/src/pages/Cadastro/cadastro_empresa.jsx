import React, { useState } from 'react';
import Input from '../../components/Input/input.jsx';
import Botao from '../../components/Botao/botao.jsx';
import '../../utils/global.css';
import stylesInput from '../../components/Input/input.module.css';
import stylesImagem from '../../components/imagem.module.css';
import SimpleHeader from '../../components/Simple_Header/simple_header.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SimpleFooter from '../../components/Simple_Footer/simple_footer.jsx';
import { useParams } from 'react-router-dom';
import imagem1 from '../../utils/assets/fundo_cadastro.avif';
import imagem2 from '../../utils/assets/fundo_cadastro2.png';
import imagem3 from '../../utils/assets/fundo_cadastro3.png';

function CadastroEmpresa() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    cep: '',
    logradouro: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
  });

  const images = [
   imagem1,
   imagem2,
   imagem3
  ];

  const { tipo } = useParams();

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
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
        <div className={stylesInput.container_cadastro}>
          <div className={stylesInput.registro}>
            <div className={stylesInput.voltar_e_titulo}>
              <a href="/nivel-usuario"><div className={stylesInput.voltar}>Voltar
              </div></a>
              <h1 className={stylesInput.h1_registro}>Cadastro da empresa</h1>
            </div>
            <Input
              label="Nome:"
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
            />
            <Input
              label="CPF/CNPJ:"
              type="text"
              name="cpf_cnpj"
              value={formData.cpf_cnpj}
              onChange={handleChange}
            />
            <Input
              label="CEP:"
              type="text"
              name="cep"
              value={formData.cep}
              onChange={handleChange}
            />
            <Input
              label="Logradouro:"
              type="text"
              name="logradouro"
              value={formData.logradouro}
              onChange={handleChange}
            />
            <Input
              label="Número:"
              type="number"
              name="numero"
              value={formData.numero}
              onChange={handleChange}
            />
            <Input
              label="Bairro:"
              type="text"
              name="bairro"
              value={formData.bairro}
              onChange={handleChange}
            />
               <Input
              label="Estado:"
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            />
            <Botao
                texto="Cadastrar"
                onClick={(e) => {
                  e.preventDefault();
                  console.log(`${tipo} registrado`);
                }}
              />
          </div>
          <div className={stylesImagem.registro_imagem}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img className={stylesImagem.imagem} src={image} alt={`Imagem ${index + 1}`} />
                </div>
              ))}
            </Slider>
          </div>

        </div>
      </div>
      <SimpleFooter />
    </section>

  );
}

export default CadastroEmpresa;