import React, { useState } from 'react';
import SideBar from "../../components/Side-Bar/sideBar";
import '../../utils/global.css';
import styles from '../Hub/Hub.module.css';
import stylesPerfil from './perfil_prestador.module.css';
import fechar_icon from "../../utils/assets/modal-x.svg";
import ECorp from "../../utils/assets/ECorp.webp";
import Modal from 'react-modal';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import AbrirChamado from '../../components/Abrir-Chamado/abrir_chamado';
import ProfilePrestador from '../../components/Profile-Data/profilePrestador';
import stylesPrestador from '../../components/Profile-Data/profilePrestador.module.css'

const PerfilPrestador = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);

    const abrirModal = (sairConta) => {
        setTipoModal(sairConta);
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <AbrirChamado h1="Adicionar Serviço" />
                <div className={styles.capsula}>
                    <span className={styles.text}>Perfil</span>
                    <div className={styles.welcome}></div>
                </div>
                <div className={stylesPerfil.perfilContainer}>
                    <div className={stylesPerfil.esquerda}>
                        <img className={stylesPerfil.imagemPerfil} src={ECorp} alt="Imagem de perfil" />
                        <h2>E-CORP</h2>
                        <div className={stylesPerfil.avaliation}>Avaliação:
                            <div className={stylesPerfil.nota}>5</div>
                        </div>
                        <button className={stylesPerfil.botao
                        } onClick={() => abrirModal('sairConta')}>Sair</button>
                    </div>
                    <div className={stylesPerfil.direita}>
                        <ProfilePrestador />
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o projeto"
                className={stylesPerfil.modal}
                overlayClassName={styles.modal_overlay}>
                <div className={stylesPerfil.modal_header}>
                    <h2>Encerrar Sessão</h2>
                    <img src={fechar_icon} alt="Fechar modal" onClick={fecharModal} />
                </div>
                <div className={stylesPerfil.modal_content}>
                    <p>Deseja confirmar a saída deste perfil?</p>
                    <button>Confirmar</button>
                </div>
            </Modal>
        </div>
    );
};

export default PerfilPrestador;