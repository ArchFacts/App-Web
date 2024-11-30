import React, { useState, useEffect } from 'react';
import styles from './chamados_empresa.module.css';
import Modal from 'react-modal';
import SideBar from '../../components/Side-Bar/sideBar';
import finalizarIcone from '../../utils/assets/check.png';
import fechar_icon from "../../utils/assets/modal-x.svg";
import ChamadosName from '../../components/Chamados-Name/chamados_name';
import AbrirChamado from '../../components/Abrir-Chamado/abrir_chamado';
import division_icon from '../../utils/assets/division.svg';
import plus_icon from '../../utils/assets/plus.svg';
import minus_icon from '../../utils/assets/minus.svg';
import stylesPrestador from '../Chamados-Prestador/chamados_prestador.module.css';

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
            <button className={styles.parcelaCell} onClick={onDefinirParcelaClick}>{parcelaLabel}</button>
            <p className={styles.aberturaCell}>{abertura}</p>
            <p className={styles.fechamentoCell}>{fechamento}</p>
            <img src={finalizarIcone} className={styles.finalizarCell} alt="Finalizar" onClick={onFinalizarClick} />
        </div>
    );
}

function ChamadosEmpresa() {
    const [chamadosState, setChamados] = useState([]);
    const [nome, setNome] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataAbertura, setDataAbertura] = useState('');
    const [dataFechamento, setDataFechamento] = useState(new Date().toISOString().slice(0, 10));
    const [parcelas, setParcelas] = useState(12);
    const [total, setTotal] = useState(0); 

    const tiposModal = {
        abrir_chamado: 'abrirChamado',
        finalizar_chamado: 'finalizarChamado',
        definir_parcela: 'definirParcela',
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [idChamado, setIdChamado] = useState(null);

    useEffect(() => {
        const agora = new Date();
        const dataAtual = agora.toISOString().slice(0, 16);
        setDataAbertura(dataAtual);
    }, []);

    useEffect(() => {
        const chamadosNoStorage = JSON.parse(localStorage.getItem('chamados')) || [];
        setChamados(chamadosNoStorage);
    }, []);

    const abrirModal = (tipo, idChamado = null) => {
        setTipoModal(tipo);
        if (tipo === tiposModal.finalizar_chamado) {
            setIdChamado(idChamado);
        }
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const salvarChamado = (e) => {
        e.preventDefault();
        const chamado = {
            id: new Date().getTime(),
            nome,
            titulo,
            descricao,
            abertura: dataAbertura,
            fechamento: dataFechamento,
            status: 'Aberto',
        };

        const chamadosExistentes = JSON.parse(localStorage.getItem('chamados')) || [];
        chamadosExistentes.push(chamado);
        localStorage.setItem('chamados', JSON.stringify(chamadosExistentes));
        setChamados(chamadosExistentes);
        setNome('');
        setTitulo('');
        setDescricao('');
        fecharModal();
    };

    const formatarData = () => {
        const data = new Date();

        if (isNaN(data)) return 'Data não definida';

        let dataFormatada = data.toLocaleString('pt-BR', {
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: false
        });

        dataFormatada = dataFormatada.replace('.', '');
        return dataFormatada;
    };

    const formatarDataFechamento = (data) => {
        if (!data || isNaN(new Date(data))) return 'Data não definida';
        const date = new Date(data);
        date.setMinutes(date.getMinutes() + date.getTimezoneOffset());
        const dia = date.getDate();
        const mes = date.toLocaleString('pt-BR', { month: 'short' });
        let dataFormatadaFechamento = `${dia} de ${mes}`;
        return dataFormatadaFechamento;
    };

    const handleDataFechamentoChange = (e) => {
        const novaData = e.target.value;
        setDataFechamento(novaData);
    };

    const salvarFechamento = (chamadoId) => {
        const novosChamados = chamadosState.map(chamado => {
            if (chamado.id === chamadoId) {
                return { ...chamado, status: 'Fechado' };
            }
            return chamado;
        });

        setChamados(novosChamados);
        localStorage.setItem('chamados', JSON.stringify(novosChamados));

        fecharModal();
    };

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <div className={styles.abrir_chamado}>
                        <AbrirChamado h1="Abrir Chamado" onAbrirChamadoClick={() => abrirModal(tiposModal.abrir_chamado)} />
                    </div>
                    <div className={styles.chamados}>
                        <ChamadosName title={'ECORP'} />
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
                        {chamadosState.map((chamado, index) => (
                            <ChamadoInfo
                                finalizarIcone={finalizarIcone}
                                key={index}
                                status={chamado.status || 'Pendente'}
                                titulo={chamado.titulo || 'Sem título'}
                                parcelaLabel={chamado.parcelaLabel || 'Definir parcelas'}
                                abertura={formatarData(chamado.abertura)}
                                fechamento={formatarDataFechamento(chamado.fechamento)}
                                onFinalizarClick={() => abrirModal(tiposModal.finalizar_chamado, chamado.id)}
                                onDefinirParcelaClick={() => abrirModal(tiposModal.definir_parcela)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'finalizarChamado'}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar o chamado"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}>
                <div className={styles.modal_header}>
                    <h2>Finalizar chamado</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <p>Deseja confirmar o encerramento deste chamado?</p>
                    <button className={stylesPrestador.botao} onClick={() => salvarFechamento(idChamado)}>Confirmar</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'definirParcela'}
                onRequestClose={fecharModal}
                contentLabel="Modal para definir a parcela"
                className={styles.modalParcela}
                overlayClassName={styles.modal_overlay}
            >
                <div className={styles.modal_header}>
                    <img src={division_icon} alt=""
                        width={60}
                        height={60} />
                    <h2>Definir parcelas</h2>
                    <img className={styles.img} src={fechar_icon} alt="Fechar"
                        onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    <div className={styles.parcelas}>
                        <img
                            src={minus_icon}
                            alt="Diminuir"
                            width={60}
                            height={60}
                            onClick={() => setParcelas((prev) => Math.max(prev - 1, 1))}
                        />
                        <h2>{parcelas}x</h2>
                        <img
                            src={plus_icon}
                            alt="Aumentar"
                            width={60}
                            height={60}
                            onClick={() => setParcelas((prev) => Math.min(prev + 1, 12))}
                        />
                    </div>
                    <div className={styles.price_field}>
                        <p>de </p>
                        <p>R$ {(total / parcelas).toFixed(2)}</p>
                    </div>
                    <div className={styles.total}>
                        Total: R$ {total}
                        <button className={stylesPrestador.botao} onClick={fecharModal}>Confirmar</button>
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
                    <div className={styles.field}>
                        <label htmlFor="nome">Nome do solicitante:</label>
                        <input type="text" id="nome" placeholder="Digite seu nome" required value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="titulo">Título do chamado:</label>
                        <input type="text" id="titulo" placeholder="Digite o título" required value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="prazo">Prazo para o término do chamado:</label>
                        <input type="date" id="prazo" required value={dataFechamento}
                            onChange={handleDataFechamentoChange} />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Descrição:</label>
                        <input type="text" id="desc" required value={descricao}
                            onChange={(e) => setDescricao(e.target.value)} />
                    </div>
                    <div className={styles.button_area}>
                        <button className={stylesPrestador.botao} type="submit" onClick={salvarChamado}>Enviar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default ChamadosEmpresa;