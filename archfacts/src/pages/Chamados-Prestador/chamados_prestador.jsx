import React, { useState, useEffect } from 'react';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import styles from './chamados_prestador.module.css';
import ChamadosNamePrestador from '../../components/Chamados-Name-Prestador/chamados_name_prestador';
import Modal from 'react-modal';
import fechar_icon from "../../utils/assets/modal-x.svg";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ChamadoPrestadorInfo({ status, titulo, parcelaLabel, abertura, fechamento, onAdicionarFilaClick, onVerChamadoClick, onDefinirCustoClick }) {
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
            <button className={styles.parcelaCell} onClick={onDefinirCustoClick}>{parcelaLabel}</button>
            <p className={styles.aberturaCell}>{abertura}</p>
            <p className={styles.fechamentoCell}>{fechamento}</p>
            <div className={styles.div_botao}>
                <button className={styles.chamadoCell} onClick={onVerChamadoClick}>Descrição</button>
                <button className={styles.chamadoCell} onClick={onAdicionarFilaClick}>Enfileirar</button>
            </div>
        </div>
    );
}

function ChamadosPrestador() {
    const chamadosPrestador = [
        {
            id: 1,
            status: 'Em progresso',
            titulo: 'Projeto de piricopico',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            id: 2,
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            id: 3,
            status: 'Fechado',
            titulo: 'Projeto de julia campioto',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            id: 4,
            status: 'Fechado',
            titulo: 'Projeto de julia campioty',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            id: 5,
            status: 'Fechado',
            titulo: 'Projeto de julia campiots',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
    ];

    const [filaChamados, setFilaChamados] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [valorInput, setValorInput] = useState('');
    const [descricaoChamado, setDescricaoChamado] = useState('');

    const abrirModal = (tipo) => {
        setTipoModal(tipo);
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const tiposModal = {
        verChamado: 'verChamado',
        definirCusto: 'definirCusto'
    }

    const confirmarCusto = () => {
        if (!valorInput || valorInput <= 0) {
            toast.error('Por favor, insira um valor válido!');
            return;
        }

        toast.success('Custo definido com sucesso!');
        setTimeout(() => {
            fecharModal();
        }, 1000);
    };

    const adicionarAFila = (chamado) => {
        if (!filaChamados.some((c) => c.id === chamado.id)) {
            setFilaChamados((prevFila) => [...prevFila, chamado]);
            toast.success(`Chamado "${chamado.titulo}" adicionado à fila!`);
        } else {
            toast.error(`Chamado "${chamado.titulo}" já está na fila.`);
        }
    };

    const processarProximoChamado = () => {
        if (filaChamados.length > 0) {
            const [proximoChamado, ...restoFila] = filaChamados;
            setFilaChamados(restoFila);
            toast.success(`Chamado "${proximoChamado.titulo}" processado!`);
        } else {
            toast.warning('Nenhum chamado na fila para processar.');
        }
    };

    const getStatusStyle = (status) => {
        if (status === 'Em progresso') return { color: 'blue' };
        if (status === 'Aberto') return { color: 'green' };
        if (status === 'Fechado') return { color: 'red' };
        return {};
    };

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <div className={styles.abrir_chamadoPrestador}>
                    </div>
                    <div className={styles.chamadosPrestador}>
                        <ChamadosNamePrestador title="abelhas" />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.barraSuperior}>
                        <p className={styles.headerStatus}>Status</p>
                        <p className={styles.headerTitle}>Título</p>
                        <p className={styles.headerParcela}>Lucro</p>
                        <p className={styles.headerAbertura}>Data de abertura</p>
                        <p className={styles.headerFechamento}>Data de fechamento</p>
                        <p className={styles.headerFinalizar}>Ações</p>
                    </div>
                    <div className={styles.form}>
                        {chamadosPrestador.map((chamado) => (
                            <ChamadoPrestadorInfo
                                key={chamado.id}
                                {...chamado}
                                onDefinirCustoClick={() => abrirModal('definirCusto')}
                                onVerChamadoClick={() => abrirModal('verChamado', chamado.titulo)}
                                onAdicionarFilaClick={() => adicionarAFila(chamado)}
                                getStatusStyle={getStatusStyle}
                            />
                        ))}
                    </div>
                </div>
                <div className={styles.filaContainer}>
                    <div className={styles.filaContent}>
                        <h2>Fila de chamados</h2>
                        <ul>
                            {filaChamados.map((chamado) => (
                                <li key={chamado.id}>{chamado.titulo}</li>
                            ))}
                        </ul>
                        <button onClick={processarProximoChamado} className={styles.botaoProcessar}>
                            Processar próximo
                        </button>
                    </div>
                </div>
            </div>

            <Modal
                isOpen={modalIsOpen && tipoModal === 'definirCusto'}
                onRequestClose={fecharModal}
                contentLabel="Modal para definir o custo"
                className={styles.modalParcela}
                overlayClassName={styles.modal_overlay}
            >
                <div className={styles.modal_header}>
                    <span className={styles.nimbus_money}></span>
                    <h2>Definir custo</h2>
                    <img className={styles.fechar} src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    <div className={styles.parcelas}>
                        Projeto de abelhas
                    </div>
                    <div className={styles.price_field}>
                        <p> R$</p>
                        <input onChange={(e) => setValorInput(e.target.value)} type="number" />
                    </div>
                    <button className={styles.botao} onClick={confirmarCusto}>Confirmar</button>
                </div>
            </Modal>

            <Modal
                isOpen={modalIsOpen && tipoModal === 'verChamado'}
                onRequestClose={fecharModal}
                contentLabel="Modal para abrir um chamado"
                className={styles.modal_chamado}
                overlayClassName={styles.modal_overlay}>

                <div className={styles.modal_header}>
                    <h2>Chamado</h2>
                    <img src={fechar_icon}
                        alt="Fechar"
                        onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    <div className={styles.field}>
                        <label htmlFor="nome">Nome do solicitante:</label>
                        <div className={styles.dado_beneficiario}>Luis Gustavo de Almeida</div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="titulo">Título do chamado:</label>
                        <div className={styles.dado_beneficiario}>Compra dos produtos de limpeza pela internet.</div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Descrição:</label>
                        <div className={styles.description}>Lorem Ipsum is simply dummy text of the printing and  typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknow n printer took a galley of   including versions of Lorem Ipsum.
                        </div>
                    </div>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
}

export default ChamadosPrestador;