import React, { useState, useCallback } from "react";
import styles from "./infos_empresa.module.css";
import ServiceCard from "../Service-Card/service_card";
import SelectBanner from "../Select-Banner/SelectBanner";
import edit_icon from "../../utils/assets/edit.svg";
import adicionar_icon from "../../utils/assets/plus_signal.svg";
import { registroServico } from "../../api";
import Modal from 'react-modal';
import fechar_icon from "../../utils/assets/modal-x.svg";
import { useDropzone } from "react-dropzone";
import { use } from "react";

function InfosEmpresa({ banner, descricaoTitulo, descricaoDetalhada, servicosTitulo }) {
  const [bannerAtualizado, setBannerAtualizado] = useState(banner || "");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    imagem: null
  });

  const [loading, setLoading] = useState(true);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("digitou");
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCadastro = async () => {
    try {
      console.log("Dados enviados", formData); 7
      toast.success("Serviço adicionado com sucesso!")
      const response = await registroServico(formData);
      console.log(response);
    } catch (error) {
      console.error("Não foi possível cadastrar esse serviço", error);
    } finally {
      setLoading(false);
    }
  }

  const fecharModal = () => {
    setModalIsOpen(false);
    setTipoModal(null);
  };

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevData) => ({
          ...prevData,
          imagem: reader.result, // Salva a imagem em um base 64
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });


  return (
    <div className={styles.infosEmpresa}>
      <SelectBanner bannerAtualizado={bannerAtualizado} setBannerAtualizado={setBannerAtualizado} />
      <div className={styles.descricao}>
        <div className={styles.titulo}>
          <h2>{descricaoTitulo}</h2> <img src={edit_icon} alt="edição" />
        </div>
        <textarea className={styles.input_descricao} type="text" src={descricaoDetalhada} />
      </div>
      <div className={styles.servicos}>
        <div className={styles.area_titulo}>
          <h2>{servicosTitulo}</h2>
          <div className={styles.adicionar_servico} onClick={() => setModalIsOpen(true)}>
            <img src={adicionar_icon} alt="adicionar serviço" />
            <p>Adicionar serviço</p>
          </div>
        </div>
        <div className={styles.cards_servico}>
          <ServiceCard />
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={fecharModal}
        contentLabel='Modal para adicionar um serviço'
        className={styles.modal_adicionar_servico}
        overlayClassName={styles.modal_overlay}>

        <div className={styles.modal_header}>
          <h2>Adicionar serviço</h2>
          <img src={fechar_icon}
            alt="Fechar"
            onClick={fecharModal} />
        </div>

        <div className={styles.modal_content}>
          <div className={styles.field}>
            <label htmlFor="nome">Nome do serviço: </label>
            <input type="text"
              name='nome'
              id="nome"
              placeholder="Digite o nome do serviço:"
              value={formData.nome}
              onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="descricao">Descrição do serviço:</label>
            <input type="text"
              name='descricao'
              id="descricao"
              placeholder="Digite a descrição do serviço:"
              value={formData.descricao}
              onChange={handleChange} />
          </div>
          <div className={styles.field}>
            <label htmlFor="imagem">Imagem do serviço: </label>
            <div {...getRootProps()} className={styles.dropzone}>
              <input {...getInputProps()} />
              {formData.imagem ? (
                <img src={formData.imagem} alt="Imagem do serviço" className={styles.imagem_servico} />
              ) : (
                <p>
                  {isDragActive
                    ? "Solte a imagem aqui..."
                    : "Arraste e solte uma imagem aqui, ou clique para selecionar"}
                </p>
              )}
            </div>
          </div>
          <div className={styles.button_area}>
            <button type="button"
              onClick={
                async () => {
                  await handleCadastro();
                  fecharModal();
                }
              }>Enviar</button>
          </div>
        </div>
      </Modal>


    </div>
  );
}

export default InfosEmpresa;
