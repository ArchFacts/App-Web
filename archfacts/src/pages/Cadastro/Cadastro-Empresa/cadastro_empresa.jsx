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
import imagem1 from '../../../utils/assets/fundo_cadastro_empresa.jpg';
import imagem2 from '../../../utils/assets/fundo_cadastro_empresa2.jpg';
import imagem3 from '../../../utils/assets/fundo_cadastro_empresa3.jpg';
import stylesCadastroEmpresa from './cadastro_empresa.module.css';

function CadastroEmpresa() {
  const navigate = useNavigate();
  const { tipo } = useParams();
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
        <div className={stylesCadastroEmpresa.container_cadastro_empresa}>
          <div className={stylesCadastroEmpresa.registro_empresa}>
          <div className={stylesCadastroEmpresa.registro_area_empresa}>
            <div className={stylesInput.voltar_e_titulo}>
            <div className={stylesInput.voltar} onClick={() => navigate('/cadastrar/prestador')}>Voltar</div>
              <h1 className={stylesInput.h1_registro}>Cadastro da<div className={stylesCadastroEmpresa.h1_company}>empresa</div></h1>
            </div>
            <div className={stylesCadastroEmpresa.all_inputs}>
            <div className={stylesCadastroEmpresa.joint_inputs} >
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
            </div>
              <div className={stylesCadastroEmpresa.joint_inputs} >
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
            />  </div>
              <div className={stylesCadastroEmpresa.joint_inputs} >
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
            /> </div>
            <div className={stylesCadastroEmpresa.joint_inputs} >
            <Input
              label="Cidade:"
              type="text"
              name="cidade"
              value={formData.cidade}
              onChange={handleChange}
            />
               <Input
              label="Estado:"
              type="text"
              name="estado"
              value={formData.estado}
              onChange={handleChange}
            />
            </div>
            </div>
            </div>
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