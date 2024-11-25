import React, { useState } from 'react';
import styles from './chamados_empresa.module.css';
import Modal from 'react-modal'
import SideBar from '../../components/Side-Bar/sideBar';
import iconeCheck from '../../utils/assets/check.png';
import fechar_icon from "../../utils/assets/modal-x.svg"
import ChamadosName from '../../components/Chamados-Name/chamados_name';
import AbrirChamado from '../../components/Abrir-Chamado/abrir_chamado';
import division_icon from '../../utils/assets/division.svg'
import plus_icon from '../../utils/assets/plus.svg'
import minus_icon from '../../utils/assets/minus.svg'

function ChamadoInfo({ status, titulo, parcelaLabel, abertura, fechamento, finalizarIcone, onFinalizarClick, onDefinirParcelaClick, onAbrirChamadoClick }) {
    const getStatusStyle = (status) => {
        if (status === 'Em progresso') return { color: 'blue' };
        if (status === 'Aberto') return { color: 'green' };
        if (status === 'Fechado') return { color: 'red' };
        return {};
    };


    return (
        <div className={styles.infos}>
            <p className={styles.statusCell} style={getStatusStyle(status)}>{status}</p>
            <p className={styles.titleCell}>{titulo}</p>
            <button className={styles.parcelaCell}
                onClick={onDefinirParcelaClick}>{parcelaLabel}</button>
            <p className={styles.aberturaCell}>{abertura}</p>
            <p className={styles.fechamentoCell}>{fechamento}</p>
            <img src={finalizarIcone}
                className={styles.finalizarCell}
                alt="Finalizar"
                onClick={onFinalizarClick} />
        </div>
    );
}

function ChamadosEmpresa() {

    const tiposModal = {
        abrir_chamado: 'abrirChamado',
        finalizar_chamado: 'finalizarChamado',
        definir_parcela: 'definirParcela',
    }

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);

    const abrirModal = (tipo) => {
        setTipoModal(tipo);
        setModalIsOpen(true);
    }

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    }

    const chamados = [
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir parcelas',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: '12X de 29,16',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir parcelas',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: '12X de 29,16',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: '12X de 29,16',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir parcelas',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: '12X de 29,16',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir parcelas',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir parcelas',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: '12X de 29,16',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
            finalizarIcone: iconeCheck,
        },
    ];

    const dadosChamado = [
        {
            nome: 'Julia Campioto',
            titulo: 'Pegar mel das abelhas',
            prazo: '15/05/2023',
            descricao: 'Ir no apiário pegar todo o mel para tomar no café da manhã',
        }
    ]

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <div className={styles.abrir_chamado}>
                        <AbrirChamado onAbrirChamadoClick={() => abrirModal(tiposModal.abrir_chamado)}></AbrirChamado>
                    </div>
                    <div className={styles.chamados}>
                        <ChamadosName title={'ECORP'}></ChamadosName>
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.barraSuperior}>
                        <p className={styles.headerStatus}>Status</p>
                        <p className={styles.headerTitle}>Título</p>
                        <p className={styles.headerParcela}>Parcela</p>
                        <p className={styles.headerAbertura}>Data de abertura</p>
                        <p className={styles.headerFechamento}>Data de fechamento</p>
                        <p className={styles.headerFinalizar}>Finalizar</p>
                    </div>
                    <div className={styles.form}>
                        {chamados.map((chamado, index) => (
                            <ChamadoInfo
                                key={index}
                                status={chamado.status}
                                titulo={chamado.titulo}
                                parcelaLabel={chamado.parcelaLabel}
                                abertura={chamado.abertura}
                                fechamento={chamado.fechamento}
                                finalizarIcone={chamado.finalizarIcone}
                                onFinalizarClick={() => abrirModal(tiposModal.finalizar_chamado)}
                                onDefinirParcelaClick={() => abrirModal(tiposModal.definir_parcela)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen && tipoModal === 'finalizarChamado'}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o projeto"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}>

                <div className={styles.modal_header}>
                    <h2>Finalizar projeto</h2>
                    <img src={fechar_icon} alt="Fechar"
                        onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <p>Deseja confirmar o encerramento deste projeto?</p>
                    <button>Confirmar</button>
                </div>
            </Modal>


            <Modal
                isOpen={modalIsOpen && tipoModal === 'definirParcela'}
                onRequestClose={fecharModal}
                contentLabel="Modal para definir a parcela"
                className={styles.modalParcela}
                overlayClassName={styles.modal_overlay}>

                <div className={styles.modal_header}>
                    <img src={division_icon} alt=""
                        width={60}
                        height={60} />
                    <h2>Definir parcelas</h2>
                    <img src={fechar_icon} alt="Fechar"
                        onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    <div className={styles.parcelas}>
                        <img src={minus_icon} alt=""
                            width={60}
                            height={60} />
                        <h2>12x</h2>
                        <img src={plus_icon} alt=""
                            width={60}
                            height={60} />
                    </div>
                    <div className={styles.price_field}><p>de </p> <p> R$ 29,16</p></div>
                    <div className={styles.total}>
                        Total: R$ 456
                        <button>Confirmar</button>
                    </div>
                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpen && tipoModal === 'abrirChamado'}
                onRequestClose={fecharModal}
                contentLabel="Modal para abrir um chamado"
                className={styles.modal_chamado}
                overlayClassName={styles.modal_overlay}>

                <div className={styles.modal_header}>
                    <h2>Enviar Chamado</h2>
                    <img src={fechar_icon}
                        alt="Fechar"
                        onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    {/* <form onSubmit={}>  */}
                    <div className={styles.field}>
                        <label htmlFor="nome">Nome do solicitante:</label>
                        <input type="text" id="nome" placeholder="Digite seu nome" required />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="titulo">Título do chamado:</label>
                        <input type="text" id="titulo" placeholder="Digite o título" required />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="prazo">Prazo para o término do chamado:</label>
                        <input type="date" id="prazo" required />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Prazo para o término do chamado:</label>
                        <input type="text" id="desc" required />
                    </div>
                    <div className={styles.button_area}>
                        <button type="submit">Enviar</button>
                    </div>
                    {/* </form> */}
                </div>
            </Modal>
        </div >

    );
}


export default ChamadosEmpresa;
