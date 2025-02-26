import React, { useState } from "react";
import styles from "./infos_empresa.module.css";
import ServiceCard from "../Service-Card/service_card";
import SelectBanner from "../Select-Banner/SelectBanner";
import edit_icon from "../../utils/assets/edit.svg";
import adicionar_icon from "../../utils/assets/plus_signal.svg";
import { registroServico } from "../../api";
import Modal from 'react-modal';

function InfosEmpresa({ banner, descricaoTitulo, descricaoDetalhada, servicosTitulo }) {
  const [bannerAtualizado, setBannerAtualizado] = useState(banner || "");
  const [modalIsOpen, setModalIsOpen] = useState(false);


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

  const abrirModal = (tipo, servicoDaVez) => {
    setTipoModal(tipo);
    setServicoSelecionado(servicoDaVez);
    setModalIsOpen(true);
  };

  const fecharModal = () => {
    setModalIsOpen(false);
    setTipoModal(null);
  };


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
        className={stylesPerfil.modal_adicionar_servico}
        overlayClassName={stylesPerfil.modal_overlay}>

        <div className={stylesPerfil.modal_header}>
          <h2>Adicionar serviço</h2>
          <img src={fechar_icon}
            alt="Fechar"
            onClick={fecharModal} />
        </div>

        <div className={stylesPerfil.modal_content}>
          <div className={stylesPerfil.field}>
            <label htmlFor="nome">Nome do serviço: </label>
            <input type="text"
              name='nome'
              id="nome"
              placeholder="Digite o nome do serviço:"
              value={formData.nome}
              onChange={handleChange} />
          </div>
          <div className={stylesPerfil.field}>
            <label htmlFor="descricao">Descrição do serviço:</label>
            <input type="text"
              name='descricao'
              id="descricao"
              placeholder="Digite a descrição do serviço:"
              value={formData.descricao}
              onChange={handleChange} />
          </div>
          <div className={stylesPerfil.button_area}>
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
