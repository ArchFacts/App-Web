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
import { registroUsuario } from '../../../api.jsx';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';

function CadastroUsuario() {
  const navigate = useNavigate();

  const { tipo } = useParams();

  const images = [imagem1, imagem2, imagem3];

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000
  };

  const formik = useFormik({
    initialValues: {
      nome: '',
      telefone: '',
      email: '',
      senha: '',
      confirmacaoSenha: '',
    },
    validationSchema: Yup.object({
      nome: Yup.string().min(3, "O nome deve ter no mínimo 3 caracteres")
        .required("O nome é um campo obrigatório"),
      telefone: Yup.string()
        .matches(/^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/,
          "O telefone deve ter 11 ou 12 dígitos")
          .required("O telefone é obrigatório"),
      email: Yup.string()
        .email("Por favor insira um e-mail válido")
        .required("O campo de e-mail é obrigatório"),
      senha: Yup.string()
        .min(6, "A senha deve ter pelo menos 6 caracteres")
        .matches(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .matches(/\d/, "A senha deve conter pelo menos um número")
        .required("Senha é obrigatória"),
      confirmacaoSenha: Yup.string()
        .oneOf([Yup.ref("senha"), null], "As senhas não coincidem")
        .required("A confirmação de senha é obrigatória"),
    }),
    validateOnChange: true,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        await registroUsuario(values);

        toast.success("Seu usuário foi criado com sucesso!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "colored",
        });

        if (tipo === 'beneficiario') {
          navigate('/login?tipo=beneficiario');
        } else if (tipo === 'prestador') {
          navigate('/login?tipo=prestador');
        } else {
          navigate('/cadastrar-funcionario');
        }
        
      } catch (error) {

        const statusCode = error.response ? error.response.status : "Desconhecido";
        const errorMessage = error.response ? error.response.data.message : "Erro de rede ou erro desconhecido";

        toast.error(`Houve um erro ${statusCode} ao cadastrar o usuário, ${errorMessage}`, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: "white",
        });
        console.log("Erro no cadastro", error);
      }
    },
  });

  return (
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
        <div className={stylesInput.container_cadastro}>
          <div className={stylesInput.registro}>
            <div className={stylesInput.registro_area}>
              <div className={stylesInput.voltar_e_titulo}>
                <a href="/nivel-usuario" className={stylesInput.voltar}>Voltar</a>
                <h1 className={stylesInput.h1_registro}>Cadastro</h1>
              </div>
              <div className={stylesInput.all_inputs}>
                <form onSubmit={formik.handleSubmit}>
                  <Input
                    label="Nome:"
                    type="text"
                    name="nome"
                    value={formik.values.nome}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.nome && formik.errors.nome}
                  />
                  <Input
                    label="Telefone:"
                    type="tel"
                    name="telefone"
                    value={formik.values.telefone}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.telefone && formik.errors.telefone}
                  />
                  <Input
                    label="Email:"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && formik.errors.email}
                  />
                  <Input
                    label="Senha:"
                    type="password"
                    name="senha"
                    value={formik.values.senha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.senha && formik.errors.senha}
                  />
                  <Input
                    label="Confirmação de Senha:"
                    type="password"
                    name="confirmacaoSenha"
                    value={formik.values.confirmacaoSenha}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmacaoSenha && formik.errors.confirmacaoSenha}
                  />
                  <Botao
                    texto={tipo === 'beneficiario' ? "Cadastrar" : "Avançar"}
                    type="submit"
                    disabled={!(formik.isValid && formik.dirty)}
                    style={{
                      backgroundColor: !(formik.isValid && formik.dirty) ? 'gray' : '#033E8C',
                      cursor: !(formik.isValid && formik.dirty) ? 'not-allowed' : 'pointer',
                    }}
                  />
                </form>
              </div>
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

export default CadastroUsuario;