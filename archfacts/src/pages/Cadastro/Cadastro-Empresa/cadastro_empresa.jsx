import React, { useState } from 'react';
import Botao from '../../../components/Botao/botao.jsx';
import '../../../utils/global.css';
import stylesInput from '../../../components/Input/Input-Usuario/input.module.css';
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
import InputEmpresa from '../../../components/Input/Input-Empresa/input_empresa.jsx';
import api, { registroEmpresa } from '../../../api.jsx';
import { toast } from 'react-toastify';

function CadastroEmpresa() {
  const navigate = useNavigate();
  const { tipo } = useParams();
  const [formData, setFormData] = useState({
    nome: '',
    cpfOrCnpj: '',
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

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (name === `cep`) {
      buscaCepData(value);
    }
  };

  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000
  };

  const identificarCnpjOuCpf = (valor) => {
    const somenteNumeros = valor.replace(/\D/g, '');
    if (somenteNumeros.length === 11) {
      return "CPF";
    } else if (somenteNumeros.length === 14) {
      return "CNPJ";
    } else {
      return null;
    }
  }

  const handleCadastro = async () => {

    const {cpfOrCnpj} = formData;
    const tipoDocumento = identificarCnpjOuCpf(cpfOrCnpj);

    if(formData.nome.trim() === ""){
      toast.error("O nome da empresa não pode estar vazio ou conter apenas espaços!",{
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
    }

    if(formData.cpfOrCnpj.trim() === ""){
      toast.error("O CPF ou CNPJ não pode estar vazio ou conter apenas espaços!",{
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
    }

    if(formData.cep.trim() === ""){
      toast.error("O CEP não pode estar vazio ou conter apenas espaços!",{
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
    }

    if(formData.numero.trim() === ""){
      toast.error("O número não pode estar vazio ou conter apenas espaços!",{
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
    }

    if(!tipoDocumento){
      toast.error(`CPF ou CNPJ inválido!`,{
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
    }

    try {
      await registroEmpresa(formData);

      localStorage.setItem('negocioData', JSON.stringify(formData));
      console.log(`Negócio cadastrado: ${JSON.stringify(formData)}`);

      toast.success("Cadastro realizado com sucesso!")

      navigate('/home-prestador');


    } catch (error) {
      console.log("Houve um erro ao fazer o cadastro", error);
      toast.error("Houve erro ao fazer o cadastro.");
    }
  };


  const buscaCepData = async (cep) => {
    try {
      const cepFiltrado = cep.replace(/\D/g, '');

      if (cepFiltrado.length === 8) {
        const resposta = await fetch(`https://viacep.com.br/ws/${cepFiltrado}/json/`);
        const data = await resposta.json();

        if (data.erro) {
          console.log("CEP não encontrado");
          return;
        }

        setFormData((prevState) => ({
          ...prevState,
          logradouro: data.logradouro || '',
          numero: data.numero || '',
          bairro: data.bairro || '',
          cidade: data.localidade || '',
          estado: data.uf || '',
        }));
      } else {
        console.log("Cep Inválido");
      }
    } catch (error) {
      console.log("Erro ao buscar o CEP", error);
    }
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
                <h1 className={stylesInput.h1_registro}>Cadastro da
                  <span className={stylesCadastroEmpresa.h1_company}> Empresa</span></h1>
              </div>
              <div className={stylesCadastroEmpresa.all_inputs}>
                <div className={stylesCadastroEmpresa.joint_inputs} >
                  <InputEmpresa
                    label="Nome:"
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                  />
                  <InputEmpresa
                    label="CPF/CNPJ:"
                    type="text"
                    name="cpfOrCnpj"
                    value={formData.cpfOrCnpj}
                    onChange={handleChange}
                  />
                </div>
                <div className={stylesCadastroEmpresa.joint_inputs} >
                  <InputEmpresa
                    label="CEP:"
                    type="text"
                    name="cep"
                    value={formData.cep}
                    onChange={handleChange}
                  />
                  <InputEmpresa
                    label="Logradouro:"
                    type="text"
                    name="logradouro"
                    value={formData.logradouro}
                    onChange={handleChange}
                  />  </div>
                <div className={stylesCadastroEmpresa.joint_inputs} >
                  <InputEmpresa
                    label="Número:"
                    type="number"
                    name="numero"
                    value={formData.numero}
                    onChange={handleChange}
                  />
                  <InputEmpresa
                    label="Bairro:"
                    type="text"
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleChange}
                  /> </div>
                <div className={stylesCadastroEmpresa.joint_inputs} >
                  <InputEmpresa
                    label="Cidade:"
                    type="text"
                    name="cidade"
                    value={formData.cidade}
                    onChange={handleChange}
                  />
                  <InputEmpresa
                    label="Estado:"
                    type="text"
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <Botao
                texto="Cadastrar"
                onClick={handleCadastro}
              />
            </div>
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

export default CadastroEmpresa;