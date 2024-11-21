import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../../utils/global.css';
import styles from '../Beneficiario/projetos_beneficiario.module.css'
import SideBar from "../../../components/Side-Bar/sideBar";
import ProjectName from "../../../components/Project-Name/project_name";
import ProjetoComponenteBeneficiario from "../../../components/Projeto/Beneficiario/projeto_componente_beneficiario";
import fechar_icon from "../../../utils/assets/modal-x.svg"

const ProjetosBeneficiario = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [projetoSelecionado, setProjetoSelecionado] = useState(null);

    const abrirModal = (projetoDaVez) => {
        setProjetoSelecionado(projetoDaVez);
        setModalIsOpen(true);
    }

    const fecharModal = () => {
        setModalIsOpen(false);
        setProjetoSelecionado(null);
    }

    return (
        <section className={styles.screen}>
            <SideBar></SideBar>
            <div className={styles.content_area}>
                <div className={styles.project_name}>
                    <ProjectName title='ECORP'></ProjectName>
                </div>
                <div className={styles.project_box}>
                    <div className={styles.detail_bar}></div>
                    <div className={styles.content_area}>
                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}
                            onFinalizarClick={abrirModal}>
                        </ProjetoComponenteBeneficiario>

                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}>
                        </ProjetoComponenteBeneficiario>

                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}>
                        </ProjetoComponenteBeneficiario>

                        <ProjetoComponenteBeneficiario name={'Projeto de Abelhas'}>
                        </ProjetoComponenteBeneficiario>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o projeto"
                className={styles.modal}
                overlayClassName={styles.modalOverlay}>

                <div className={styles.modalHeader}>
                    <h2>Finalizar projeto</h2>
                    <img src={fechar_icon} alt="" 
                    onClick={fecharModal}/>
                </div>
                <div className={styles.modalContent}>
                    <p>Deseja confirmar o encerramento deste projeto?</p>
                    <button>Confirmar</button>
                </div>
            </Modal>
        </section>
    );
}

export default ProjetosBeneficiario;