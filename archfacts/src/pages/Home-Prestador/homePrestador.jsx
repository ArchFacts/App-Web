import React, { useState } from 'react'
import Modal from 'react-modal'
import styles from './homePrestador.module.css'
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import EnterpriseScore from '../../components/Enterprise-Score/enterpriseScore';
import OpenProposal from '../../components/Open-Proposal/openProposal';
import fechar_icon from "../../utils/assets/modal-x.svg"

const HomePrestador = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [propostaSelecionada, setPropostaSelecionada] = useState(null);

    const abrirModal = (propostaDaVez) => {
        setPropostaSelecionada(propostaDaVez);
        setModalIsOpen(true);
    }

    const fecharModal = () => {
        setModalIsOpen(false);
        setPropostaSelecionada(null);
    }

    const propostas = [
        {
            solicitante: "Julia Campioto",
            servicos: "Carros estéticos, Carros esportivos",
            email: "julia.campioto@exemplo.com",
            descricao: "Serviço de manutenção de carros"
        }
    ]


    return (
        <>
            <section>
                <SideBarColaborador />
                <div className={styles.content}>
                    <div className={styles.capsula}>
                        <span className={styles.text}> Seja bem vindo!</span>
                        <div className={styles.welcome}></div>
                    </div>
                    <div className={styles.card}>
                    </div>
                    <div className={styles.conteudo}>
                        <EnterpriseScore
                            empresa={"Stefanini"}
                            avaliacao={"4"}
                        />
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
                            {propostas.map((proposta, index) => (
                                <OpenProposal
                                    key={index}
                                    email={proposta.email}
                                    solicitante={proposta.solicitante}
                                    servicos={proposta.servicos}
                                    onClick={() => abrirModal(proposta)}
                                />
                            ))}

                            <Modal
                                isOpen={modalIsOpen}
                                onRequestClose={fecharModal}
                                contentLabel="Modal para finalizar o projeto"
                                className={styles.modal}
                                overlayClassName={styles.modal_overlay}>

                                <div className={styles.modal_header}>
                                    <h2>Proposta de {propostaSelecionada.solicitante}</h2>
                                    <img src={fechar_icon}
                                        alt="Fechar"
                                        onClick={fecharModal} />
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
                                            <div className={styles.button}><p>Aceitar Proposta/</p></div>
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