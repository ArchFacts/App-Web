import React, { useState } from 'react';
import Input from '../../components/Input/Input-Usuario/input.jsx';
import Botao from '../../components/Botao/botao.jsx';
import stylesInput from '../../components/Input/Input-Usuario/input.module.css';
import stylesImagem from '../../components/imagem.module.css';
import SimpleHeader from '../../components/Simple-Header/simple_header.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SimpleFooter from '../../components/Simple-Footer/simple_footer.jsx';
import { useNavigate, useSearchParams } from 'react-router-dom';
import imagem1 from '../../utils/assets/login1.jpg';
import imagem2 from '../../utils/assets/login2.jpg';
import imagem3 from '../../utils/assets/login3.jpg';
import stylesLogin from '../Login/login.module.css';
import api, { loginUsuario } from '../../api.jsx';
import { toast } from 'react-toastify';


const Login = () => {

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const tipo = searchParams.get('tipo');

  const [formData, setFormData] = useState({
    login: '',
    senha: '',
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

  const handleNavigation = () => {
    if (tipo === 'funcionario') {
      navigate('/cadastrar-funcionario');
    } else if (tipo == 'prestador') {
      navigate('/cadastrar-empresa')
    }
    else {
      navigate('/cadastrar/beneficiario');
    }
  };

  const handleLogin = async () => {
    try {
      await loginUsuario(formData);
      toast.success("Usuário logado com sucesso!");
      navigate('/empresas-parceiras');
    } catch (error) {
      toast.error("Houve um erro ao fazer login na sua conta");
      console.log("Erro", error)
    }
  }

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000
  };
  return (
    <>

      <section className={stylesInput.tela}>
        <SimpleHeader />
        <div className={stylesInput.content_area}>
          <div className={stylesInput.container_cadastro}>
            <div className={stylesInput.registro}>
              <div className={stylesInput.registro_area}>
                <div className={stylesInput.voltar_e_titulo}>
                  <a onClick={handleNavigation} className={stylesInput.voltar}>Voltar
                  </a>
                  <h1 className={stylesLogin.h1_registro}>Login</h1>
                </div>
                <div className={stylesLogin.all_inputs}>
                  <Input
                    label="Email:"
                    type="login"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                  />
                  <Input
                    label="Senha:"
                    type="password"
                    name="senha"
                    value={formData.senha}
                    onChange={handleChange}
                  /> </div> </div>
              <div className={stylesLogin.button}>
                <Botao
                  texto='Entrar'
                  onClick={(e) => {
                    e.preventDefault();
                    console.log(`Entrar`);
                    handleLogin();
                  }}
                /> </div>
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

    </>
  )
}

export default Login;