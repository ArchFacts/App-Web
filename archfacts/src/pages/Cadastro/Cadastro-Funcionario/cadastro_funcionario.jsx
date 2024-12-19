import React, { useState } from 'react';
import Botao from '../../../components/Botao/botao.jsx';
import '../../../utils/global.css';
import stylesInput from '../../../components/Input/Input-Usuario/input.module.css';
import SimpleHeader from '../../../components/Simple-Header/simple_header.jsx';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import SimpleFooter from '../../../components/Simple-Footer/simple_footer.jsx';
import { useNavigate} from 'react-router-dom';
import imagem1 from '../../../utils/assets/fundo_cadastro_funcionario.jpg';
import imagem2 from '../../../utils/assets/fundo_cadastro_funcionario2.jpg';
import imagem3 from '../../../utils/assets/fundo_cadastro_funcionario3.jpg';
import stylesCadastroEmpresa from '../Cadastro-Empresa/cadastro_empresa.module.css';
import stylesCadastroFuncionario from './cadastro_funcionario.module.css'
import InputFuncionario from '../../../components/Input/Input-Funcionario/input_funcionario.jsx';
import { toast } from 'react-toastify';

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
    autoplaySpeed: 5000
  };

  const handleFuncionario = () => {
    if(formData.codigoNegocio.trim() === ""){
      toast.error("O código de negócio não pode estar vazio ou conter apenas espaços!",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored", 
        style: { color: "white" },
      });
      return;
    } else{
      toast.success("Cadastro realizado com sucesso! Redirecionando...",{
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored", 
        style: { color: "white" },
      }),
      setTimeout(() => {
        navigate('/login?tipo=funcionario');
      }, 3000);
    }
  };

  return (
    <section className={stylesInput.tela}>
      <SimpleHeader />
      <div className={stylesInput.content_area}>
      <div className={stylesCadastroFuncionario.container_cadastro_funcionario}>
      <div className={stylesCadastroFuncionario.registro_funcionario}>
      <div className={stylesCadastroFuncionario.registro_area_funcionario}>
              <div className={stylesCadastroFuncionario.voltar_e_titulo}>
                <div className={stylesInput.voltar} onClick={() => navigate('/cadastrar/funcionario')}>Voltar</div>
                <div className={stylesCadastroFuncionario.titulo_e_frase}>
                <h1 className={stylesInput.h1_registro}>Se torne um
                <span className={stylesCadastroEmpresa.h1_company}> Colaborador!</span></h1>
                <div className={stylesCadastroFuncionario.frase}>
                Basta digitar o código de negócio e você estará pronto para começar!
              </div>
              </div>
              </div>
              <InputFuncionario
                label="Código de negócio:"
                type="text"
                name="codigoNegocio"
                value={formData.codigoNegocio}
                onChange={handleChange}
              />
            </div>
            <Botao
              texto="Filiar-se"
              onClick={handleFuncionario}
            />
          </div>
          <div className={stylesCadastroEmpresa.registro_imagem}>
            <Slider {...settings}>
              {images.map((image, index) => (
                <div key={index}>
                  <img className={stylesCadastroEmpresa.imagem_empresa} src={image} alt={`Imagem ${index + 1}`} />
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