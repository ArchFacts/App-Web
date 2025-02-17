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
import api, { dadosUsuarioLogado, loginUsuario } from '../../api.jsx';
import { toast } from 'react-toastify';

import * as Yup from 'yup';
import { useFormik } from 'formik';

const Login = () => {

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tipo = searchParams.get('tipo');
  const [usuarioLogado, setUsuarioLogado] = useState();

  const images = [
    imagem1,
    imagem2,
    imagem3
  ];

  const formik = useFormik({
    initialValues: {
      login: '',
      senha: '',
    },
    validationSchema: Yup.object({
      login: Yup.string().email("Insira um e-mail válido")
        .required("O campo login é obrigatório"),
      senha: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .matches(/\d/, "A senha deve conter pelo menos um número")
        .required("Senha é obrigatória"),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await loginUsuario(values);

        const jwtToken = response.data.token
        localStorage.setItem("jwtToken", jwtToken);

        const dadosUsuario = await dadosUsuarioLogado();
        console.log(dadosUsuario);

        toast.success("Usuário logado com sucesso! Redirecionanado....", { theme: "colored" });

        setTimeout(() => {
          if (tipo === "prestador") {
            navigate('/cadastrar-empresa')
          }
          else if (dadosUsuario.data.role === "USER") {
            navigate(`/hub`);
            console.log("Entrou" + dadosUsuario.negocio)
          } else {
            navigate('/home-prestador');
          }
        }, 3000);
      } catch (error) {
        const statusCode = error.response ? error.response.status : "Desconhecido";
        const errorMessage = error.response ? error.response.data.message : "Erro de rede ou erro desconhecido";

        toast.error(`Houve um erro ${statusCode} ao fazer login do usuário, ${errorMessage}`, { theme: error });
        console.log(error);
      }
    },
  });


  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000
  };

  return (
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
        <div className={stylesInput.container_cadastro}>
          <div className={stylesInput.registro}>
            <div className={stylesInput.registro_area}>
              <div className={stylesInput.voltar_e_titulo}>
                <a onClick={() => navigate('/')} className={stylesInput.voltar}>Voltar</a>
                <h1 className={stylesLogin.h1_registro}>Login</h1>
              </div>
              <form onSubmit={formik.handleSubmit}>
                <div className={stylesLogin.all_inputs}>
                  <Input
                    label="Email:"
                    type="email"
                    name="login"
                    value={formik.values.login}
                    onChange={formik.handleChange}
                    error={formik.touched.login && formik.errors.login}
                  />
                  <Input
                    label="Senha:"
                    type="password"
                    name="senha"
                    value={formik.values.senha}
                    onChange={formik.handleChange}
                    error={formik.touched.senha && formik.errors.senha}
                  />
                </div>
                <div className={stylesLogin.button}>
                  <Botao
                    texto="Entrar"
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    style={{
                      backgroundColor: !(formik.isValid && formik.dirty) ? 'gray' : '#033E8C',
                      cursor: !(formik.isValid && formik.dirty) ? 'not-allowed' : 'pointer',
                    }}
                  />
                </div>
              </form>
            </div>
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

export default Login;