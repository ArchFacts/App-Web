import React, { useState, useEffect } from 'react';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import styles from './chamados_prestador.module.css';
import ChamadosNamePrestador from '../../components/Chamados-Name-Prestador/chamados_name_prestador';
import Modal from 'react-modal';
import fechar_icon from "../../utils/assets/modal-x.svg";
import { ToastContainer, toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { buscarChamadosNegocio, dadosUsuarioLogado, definirCusto } from '../../api';

function ChamadoPrestadorInfo({ status, titulo, lucro, abertura, fechamento, onVerChamadoClick, onDefinirCustoClick }) {
    const getStatusStyle = (status) => {
        if (status === 'EM PROGRESSO') return { color: 'blue' };
        if (status === 'ABERTO') return { color: 'green' };
        if (status === 'FECHADO') return { color: 'red' };
        return {};
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <div className={styles.infos}>
            <p className={styles.statusCell} style={getStatusStyle(status)}>{status}</p>
            <p className={styles.titleCell}>{titulo}</p>

            {lucro === null || lucro === undefined ? (
                <button
                    className={`${styles.parcelaCell} ${lucro === null || lucro === undefined ? styles.hidden : ''}`}
                    onClick={onDefinirCustoClick}
                >
                    Definir lucro
                </button>
            ) : (
                <p className={styles.lucroCell}>R$ {lucro.toFixed(2)}</p>
            )}

            {/* <button className={styles.parcelaCell} onClick={onDefinirCustoClick}>Definir lucro</button> */}
            <p className={styles.aberturaCell}>{formatarData(abertura)}</p>
            <p className={styles.fechamentoCell}>{formatarData(fechamento)}</p>
            {/* <div className={styles.finalizarCell}> */}
            <div className={styles.div_botao}>
                <button className={styles.chamadoCell} onClick={onVerChamadoClick}>Ver descrição</button>
            </div>
            {/* </div> */}
        </div>
    );
}

function ChamadosPrestador() {
    // const chamadosPrestador = ([
    //     {
    //         status: 'Em progresso',
    //         titulo: 'Projeto de abelhas',
    //         parcelaLabel: 'Definir custo',
    //         abertura: '28 de março, 15:35',
    //         fechamento: '07 de abril, 21:02',
    //     },
    //     {
    //         status: 'Aberto',
    //         titulo: 'Projeto de abelhas',
    //         parcelaLabel: 'Definir custo',
    //         abertura: '28 de março, 15:35',
    //         fechamento: '07 de abril, 21:02',
    //     },
    //     {
    //         status: 'Fechado',
    //         titulo: 'Projeto de abelhas',
    //         parcelaLabel: 'Definir custo',
    //         abertura: '28 de março, 15:35',
    //         fechamento: '07 de abril, 21:02',
    //     },
    const [chamados, setChamados] = useState([]);

    const location = useLocation();
    const idProjeto = location.state?.idProjeto;
    console.log("ID DO PROJETOProjeto recebido", idProjeto);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [valorInput, setValorInput] = useState('');

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true);

    const [chamadoSelecionado, setChamadoSelecionado] = useState(null);

    const abrirModal = (tipo, idChamado) => {
        setTipoModal(tipo);
        setModalIsOpen(true);
        setChamadoSelecionado(idChamado);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const tiposModal = {
        verChamado: 'verChamado',
        definirCusto: 'definirCusto'
    }

    const atualizarCusto = async () => {
        if (!valorInput || valorInput <= 0) {
            toast.error('Por favor, insira um valor válido!');
            return;
        }

        try {
            const payload = {
                idChamado: chamadoSelecionado,
                lucro: parseFloat(valorInput),
            };

            console.log(payload);

            const response = await definirCusto(payload);
            console.log("Atualaizando chamado", response);
            toast.success("O custo para o chamado foi definido com sucesso");
        } catch (error) {
            console.error("ERRO AO DEFINIR O CUSTO");
            toast.error("Houve um erro ao definir o custo, por favor tente novamente!");
        }

        toast.success('Custo definido com sucesso!');
        setTimeout(() => {
            fecharModal();
        }, 1000);
    };

    const buscarDadosUsuarioLogado = async () => {
        // setLoading(true);  
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário", error);
        }
        finally {
            // setLoading(false);
        }
    };

    const buscarChamados = async (idProjeto) => {
        if (!usuario) {
            console.error("Usuário não encontrado");
            return;
        }

        // setLoading(true);
        try {
            const response = await buscarChamadosNegocio(idProjeto);
            setChamados(response.data);
            console.log("BUSCANDO Chamado", response.data);
        } catch (error) {
            console.error("Erro ao buscar as tarefas do negócio", error);
        }
    }

    useEffect(() => {
        buscarDadosUsuarioLogado();
    }, []);

    useEffect(() => {
        if (usuario) {
            buscarChamados(idProjeto);
        }
    }, [usuario]);

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
                        <p className={styles.headerFinalizar}>Descrição</p>
                    </div>
                    <div className={styles.form}>
                        {chamados.length > 0 ? (
                            chamados.map((chamadoPrestador, index) => (
                                <ChamadoPrestadorInfo
                                    key={chamadoPrestador.idChamado}
                                    {...chamadoPrestador}
                                    onFinalizarClick={() => console.log('Finalizar chamadoPrestador', index)}
                                    onDefinirCustoClick={() => abrirModal(tiposModal.definirCusto, chamadoPrestador.idChamado)}
                                    onVerChamadoClick={() => abrirModal(tiposModal.verChamado)}
                                />
                            ))
                        ) : (
                            <p>Não há chamados disponíveis.</p>
                        )}
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
                    <button className={styles.botao} onClick={atualizarCusto}>Confirmar</button>
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