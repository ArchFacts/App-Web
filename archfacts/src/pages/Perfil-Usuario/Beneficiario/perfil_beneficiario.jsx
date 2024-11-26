import React, { useState } from 'react';
import SideBar from "../../../components/Side-Bar/sideBar";
import Modal from 'react-modal';
import '../../../utils/global.css';
import styles from '../../Hub/Hub.module.css';
import stylesPerfil from '../Beneficiario/perfil.module.css';
import ProfileData from "../../../components/Profile-Data/profileData";
import fechar_icon from "../../../utils/assets/modal-x.svg";
import ECorp from "../../../utils/assets/ECorp.webp";

const PerfilBeneficiario = () => {
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
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <span className={styles.text}>Perfil</span>
                    <div className={styles.welcome}></div>

                    <div className={stylesPerfil.perfilContainer}>
                        <div className={stylesPerfil.esquerda}>
                            <img className={stylesPerfil.imagemPerfil} src={ECorp} alt="Imagem de Perfil" />
                            <h2>Luis Gustavo</h2>
                            <button className={stylesPerfil.botao} onClick={() => abrirModal('sairConta')}>Sair da conta</button>
                        </div>
                        <div className={stylesPerfil.direita}>
                            <ProfileData />
                        </div>
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o projeto"
                className={stylesPerfil.modal}
                overlayClassName={styles.modal_overlay}
            >
                <div className={stylesPerfil.modal_header}>
                    <h2>Encerrar Sessão</h2>
                    <img src={fechar_icon} alt="Fechar Modal" onClick={fecharModal} />
                </div>
                <div className={stylesPerfil.modal_content}>
                    <p>Deseja confirmar a saída deste perfil?</p>
                    <button onClick={fecharModal}>Confirmar</button>
                </div>
            </Modal>
        </div>
    );
}

export default PerfilBeneficiario;