import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import styles from './homePrestador.module.css'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import EnterpriseScore from '../../components/Enterprise-Score/enterpriseScore';
import OpenProposal from '../../components/Open-Proposal/openProposal';
import fechar_icon from "../../utils/assets/modal-x.svg"
import axios from 'axios';
import api from '../../api';
import Spinner from '../../components/Spinner/spinner';
import { useNavigate } from 'react-router-dom';

const HomePrestador = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [propostaSelecionada, setPropostaSelecionada] = useState(null);
    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true)
    const [propostas, setPropostas] = useState([]);
    const navigate = useNavigate();

    const abrirModal = (propostaDaVez) => {
        setPropostaSelecionada(propostaDaVez);
        setModalIsOpen(true);
    }

    const fecharModal = () => {
        setModalIsOpen(false);
        setPropostaSelecionada(null);
    }

    const redirecionarPerfil = () => {
        navigate('/perfil-prestador');
    }

    // MOCADO

    // const propostas = [
    //     {
    //         solicitante: "Julia Campioto",
    //         servicos: "Carros estéticos, Carros esportivos",
    //         email: "julia.campioto@exemplo.com",
    //         descricao: "Serviço de manutenção de carros"
    //     }
    // ]

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

    const buscarPropostas = async () => {
        try {
            const response = await api.get('/propostas');
            setPropostas(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Não foi possível buscar as propostas desse negócio", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        buscarDadosUsuario();
        buscarPropostas();
        console.log("user" + usuario);
        console.log("propostas" + propostas);
    }, []);


    return (
        <>
            <section>
                <SideBarColaborador redirecionarPerfil={redirecionarPerfil} />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}> Seja bem vindo!</span>
                        <div className={styles.welcome}></div>
                    </div>
                    <div className={styles.card}>
                    </div>
                    <div className={styles.conteudo}>
                        {loading ? (<Spinner />) : (
                            <EnterpriseScore
                                empresa={usuario && usuario.negocio ? usuario.negocio.nome : "Indisponível"}
                                avaliacao={usuario && usuario.negocio ? usuario.negocio.avaliacao : 0}
                            />
                        )}
                        <div className={styles.propostas}>
                            <div className={styles.titulo}>
                                <h1>Propostas abertas</h1>
                            </div>
                            <div className={styles.titulosColunas}>
                                <span><p>Solicitante</p></span>
                                <span><p>Serviço escolhidos</p></span>
                                <span><p>Download</p></span>
                                <span><p>Aceitar Recusar</p></span>
                            </div>
                            {propostas.length > 0 ? (
                                propostas.map((proposta, index) => (
                                    <OpenProposal
                                        key={index}
                                        email={proposta.email}
                                        solicitante={proposta.solicitante}
                                        servicos={proposta.servicos}
                                        onClick={() => abrirModal(proposta)}
                                    />
                                ))
                            ) : (
                                <p>Não há propostas disponíveis.</p>
                            )}

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={fecharModal}
                                contentLabel="Modal para finalizar o projeto"
                                className={styles.modal}
                                overlayClassName={styles.modal_overlay}>

                                <div className={styles.modal_header}>
                                    {propostaSelecionada && (
                                        <>
                                            <h2>Proposta de {propostaSelecionada.solicitante}</h2>
                                            <img src={fechar_icon}
                                                alt="Fechar"
                                                onClick={fecharModal} />
                                        </>
                                    )}
                                </div>

                                {propostaSelecionada && ( // Estrutura condicional, ele só carregará o que está abaixo se tiver algo (previne erros)
                                    <div className={styles.modal_content}>
                                        <div className={styles.field}>
                                            <p className={styles.title}>E-mail do solicitante:</p>
                                            <p className={styles.content}>{propostaSelecionada.email}</p>
                                        </div>
                                        <div className={styles.field}>
                                            <p className={styles.title}>Serviços escolhidos:</p>
                                            <p className={styles.content}>{propostaSelecionada.servicos}</p>
                                        </div>
                                        <div className={styles.field}>
                                            <p className={styles.title}>Descrição adicional:</p>
                                            <p className={styles.content}>{propostaSelecionada.descricao}</p>
                                        </div>
                                        <div className={styles.button_area}>
                                            <div className={styles.button}><p>Recusar proposta</p></div>
                                            <div className={styles.button}><p>Aceitar Proposta</p></div>
                                        </div>
                                    </div>
                                )}
                            </Modal>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomePrestador;