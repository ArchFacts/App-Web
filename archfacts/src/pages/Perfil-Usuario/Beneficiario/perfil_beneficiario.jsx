import React, { useState, useEffect } from 'react';
import SideBar from "../../../components/Side-Bar/sideBar";
import Modal from 'react-modal';
import '../../../utils/global.css';
import styles from '../../Hub/Hub.module.css';
import stylesPerfil from '../Beneficiario/perfil.module.css';
import ProfileData from "../../../components/Profile-Data/profileData";
import fechar_icon from "../../../utils/assets/modal-x.svg"
import ECorp from "../../../utils/assets/ECorp.webp";
import { useNavigate } from 'react-router-dom';
import { dadosUsuarioLogado } from '../../../api';
import Spinner from '../../../components/Spinner/spinner';


const PerfilBeneficiario = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);


    const handleSair = () => {
        if (modalIsOpen) {
            navigate('/');
        }
    }

    const abrirModal = (sairConta) => {
        setTipoModal(sairConta);
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const buscarDadosUsuarioLogado = async () => {
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário", error);
        } finally {
            setLoading(false);
        }
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    useEffect(() => {
        buscarDadosUsuarioLogado();
    }, []);

    if (loading) {
        return <Spinner />;
    }

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={stylesPerfil.content_header}>
                    <span className={styles.text}>Perfil</span>
                    <div className={styles.welcome}></div>
                </div>
                <div className={stylesPerfil.content_beneficiario}>
                    <div className={styles.capsula}>
                        <div className={stylesPerfil.perfilContainer}>
                            <div className={stylesPerfil.esquerda}>
                                <img className={stylesPerfil.imagemPerfil} src={ECorp} alt="Imagem de Perfil" />
                                <h2>{usuario.nome || "Indisponível"}</h2>
                                <button className={stylesPerfil.botao} onClick={() => abrirModal('sairConta')}>Sair da conta</button>
                            </div>
                            <div className={stylesPerfil.direita}>
                                <ProfileData
                                    email={usuario.email || "Indisponível"}
                                    telefone={usuario.telefone || "Indisponível"}
                                    dataRegistro={formatarData(usuario.dataRegistro) || "Indisponível"}
                                />
                            </div>
                        </div>
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
                    <button onClick={handleSair} className={stylesPerfil.botao}>Confirmar</button>
                </div>
            </Modal>
        </div>
    );
};

export default PerfilBeneficiario;