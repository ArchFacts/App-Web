import React, { useState } from 'react';
import Input from '../../../components/Input/input.jsx';
import Botao from '../../../components/Botao/botao.jsx';
import '../../../utils/global.css';
import stylesInput from '../../../components/Input/input.module.css';
import stylesImagem from '../../../components/imagem.module.css';
import SimpleHeader from '../../../components/Simple-Header/simple_header.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SimpleFooter from '../../../components/Simple-Footer/simple_footer.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import imagem1 from '../../../utils/assets/fundo_cadastro_funcionario.jpg';
import imagem2 from '../../../utils/assets/fundo_cadastro_funcionario2.jpg';
import imagem3 from '../../../utils/assets/fundo_cadastro_funcionario3.jpg';
import stylesCadastroEmpresa from '../Cadastro-Empresa/cadastro_empresa.module.css';
import stylesCadastroFuncionario from './cadastro_funcionario.module.css'

function CadastroFuncionario() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    codigoNegocio: '',
  });

  const images = [
   imagem1,
   imagem2,
   imagem3
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
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
        <div className={stylesInput.container_cadastro}>
          <div className={stylesInput.registro}>
          <div className={stylesInput.registro_area}>
            <div className={stylesInput.voltar_e_titulo}>
            <div className={stylesInput.voltar} onClick={() => navigate('/cadastrar/prestador')}>Voltar</div>
              <h1 className={stylesInput.h1_registro}>Se torne um<div className={stylesCadastroEmpresa.h1_company}>colaborador!</div></h1>
            </div>
            <div className={stylesCadastroFuncionario.frase}>
            Basta colocar o código de negócio e você está pronto para começar
            </div>
            <Input
              label="Código de negócio:"
              type="text"
              name="codigo_negocio"
              value={formData.codigoNegocio}
              onChange={handleChange}
            />
        </div>
            <Botao
                texto="Filiar-se"
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

export default CadastroFuncionario;