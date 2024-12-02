import React, { useState } from 'react';
import Input from '../../../components/Input/Input-Usuario/input.jsx';
import Botao from '../../../components/Botao/botao.jsx';
import '../../../utils/global.css';
import stylesInput from '../../../components/Input/Input-Usuario/input.module.css';
import stylesImagem from '../../../components/imagem.module.css';
import SimpleHeader from '../../../components/Simple-Header/simple_header.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SimpleFooter from '../../../components/Simple-Footer/simple_footer.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import imagem1 from '../../../utils/assets/fundo_cadastro_usuario.avif';
import imagem2 from '../../../utils/assets/fundo_cadastro_usuario2.png';
import imagem3 from '../../../utils/assets/fundo_cadastro_usuario3.png';
import api, { registroUsuario } from '../../../api.jsx';
import { toast } from 'react-toastify';

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
    autoplaySpeed: 5000
  };

  // if(!foa.normDatme.trim()){
  //     toast.error("Por favor, insira o seu nome.");
  //     return; 
  // }

  const handleCadastro = async () => {
    try {
      await registroUsuario(formData);

      localStorage.setItem('beneficiarioData', JSON.stringify(formData));
      console.log(`Beneficiário registrado: ${JSON.stringify(formData)}`);

      toast.success("Seu usuário foi criado com sucesso!", {
        position: "top-center", // Use uma posição válida
        autoClose: 5000,       // Fecha automaticamente após 5 segundos
        hideProgressBar: false, // Exibe a barra de progresso
        closeOnClick: true,    // Fecha ao clicar
        pauseOnHover: true,    // Pausa ao passar o mouse
        draggable: true,       // Permite arrastar o toast
        theme: "colored",      // Tema do toast 
      });

      if (tipo === 'beneficiario') {
        navigate('/login?tipo=beneficiario');

      } else if (tipo === 'prestador') {
        navigate('/login?tipo=prestador');

      }
      else {
        navigate('/cadastrar-funcionario');
      }


    } catch (error) {
      toast.error("Houve um erro ao cadastrar o usuário, por favor tente novamente!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark", 
        style: { 
          background: "white",  
          color: "white",        
          fontSize: "15px",
          fontWeight: "regular",
        },
        progressStyle: { background: "#F95C00" }, 
      });
      console.log("Erro no cadastro", error)
    }
  };

  return (
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
        <div className={stylesInput.container_cadastro}>
          <div className={stylesInput.registro}>
            <div className={stylesInput.registro_area}>
              <div className={stylesInput.voltar_e_titulo}>
                <a href="/nivel-usuario" className={stylesInput.voltar}>Voltar
                </a>
                <h1 className={stylesInput.h1_registro}>Cadastro</h1>
              </div>
              <div className={stylesInput.all_inputs}>
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
                /> </div> </div>
            <Botao
              texto={tipo === 'beneficiario' ? "Cadastrar" : "Avançar"}
              onClick={(e) => {
                e.preventDefault();
                console.log(`${tipo} registrado`);

                handleCadastro();
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