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
import imagem1 from '../../../utils/assets/fundo_cadastro.avif';
import imagem2 from '../../../utils/assets/fundo_cadastro2.png';
import imagem3 from '../../../utils/assets/fundo_cadastro3.png';

function CadastroUsuario() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    confirmacaoSenha: '',
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
              <h1 className={stylesInput.h1_registro}>Cadastro</h1>
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
            <Botao
              texto={tipo === 'beneficiario' ? "Cadastrar" : "Avançar"}
              onClick={(e) => {
                e.preventDefault();
                console.log(`${tipo} registrado`);

                if (tipo === 'beneficiario') {
                  navigate('/'); 
                } else if(tipo == 'prestador'){
                  navigate('/cadastrar-empresa')
                }
                 else {
                  navigate('/'); 
                }
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

export default CadastroUsuario;