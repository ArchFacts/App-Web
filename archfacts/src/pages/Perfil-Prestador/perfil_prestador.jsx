import React, { useState, useEffect } from 'react';
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
import stylesPrestador from '../../components/Profile-Data/profilePrestador.module.css';
import Spinner from '../../components/Spinner/spinner';
import api, { imagemGenerica, registroServico } from '../../api';
import CadastroUsuario from '../Cadastro/Cadastro-Usuario/cadastro_usuario';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PerfilPrestador = () => {
    const navigate = useNavigate();
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [loading, setLoading] = useState(true)
    const [usuario, setUsuario] = useState(null);
    const [servicoSelecionado, setServicoSelecionado] = useState(null);

    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
    });

    const tiposModal = {
        encerrar_sessao: 'encerrarSessao',
        criar_servico: 'criarServico',
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log("digitou");
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const abrirModal = (tipo, servicoDaVez) => {
        setTipoModal(tipo);
        setServicoSelecionado(servicoDaVez);
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const buscarDadosUsuario = async () => {
        try {
            const response = await api.get('/perfis');
            setUsuario(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Não foi possível buscar os dados desse usuário logado", error);
        } finally {
            setLoading(false);
        }
    }

    const handleConfirmarClick = () => {
        localStorage.removeItem("jwtToken");
        navigate("/");
    }

    // const handleCadastro = async () => {

    //     try {
    //         console.log("Dados enviados", formData); 7
    //         toast.success("Serviço adicionado com sucesso!")
    //         const response = await registroServico(formData);
    //         console.log(response);
    //     } catch (error) {
    //         console.error("Não foi possível cadastrar esse serviço", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // }

    useEffect(() => {
        buscarDadosUsuario();
    }, []);

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <AbrirChamado h1="Adicionar Serviço"
                    onAbrirChamadoClick={() => abrirModal(tiposModal.criar_servico)} />
                <div className={styles.capsula}>
                    <span className={styles.text}>Perfil</span>
                    <div className={styles.welcome}></div>
                </div>
                {loading ? (
                    <Spinner />
                ) : (
                    usuario ? (
                        <div className={stylesPerfil.content_perfil}>
                            <div className={stylesPerfil.perfilContainer}>
                                <div className={stylesPerfil.esquerda}>
                                    <div className={stylesPerfil.profile}>
                                        <div className={stylesPrestador.content_itens}>
                                            <img className={stylesPerfil.imagemPerfil}
                                                src={imagemGenerica(usuario.negocio.nome) || "Nome indisponível"}
                                                alt="Imagem de perfil" />
                                        </div>
                                        <h2 className={stylesPerfil.nome_negocio}>{usuario.negocio.nome || "Nome indisponível"}</h2>
                                        <div className={stylesPerfil.avaliation}>Avaliação:
                                            <div className={stylesPerfil.nota}> {usuario.negocio.avaliacao}</div>
                                        </div>
                                        <button className={stylesPerfil.botao
                                        } onClick={() => abrirModal('encerrarSessao')}>Sair</button>
                                    </div>
                                </div>
                                <div className={stylesPerfil.direita}>
                                    <ProfilePrestador
                                        codigoNegocio={usuario.negocio.codigo}
                                        email={usuario.email}
                                        cpf={usuario.negocio.cpf}
                                        cnpj={usuario.negocio.cnpj}
                                        telefone={usuario.telefone} />
                                </div>
                            </div>
                        </div>
                    ) : (
                        <p>Dados de usuário não encontrados. </p>
                    )
                )}
            </div>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'encerrarSessao'}
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
                    <button onClick={handleConfirmarClick} className={stylesPrestador.botao}>Confirmar</button>
                </div>
            </Modal>

            {/* <Modal
                isOpen={modalIsOpen && tipoModal === 'criarServico'}
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
            </Modal> */}
        </div>
    );
};


export default PerfilPrestador;