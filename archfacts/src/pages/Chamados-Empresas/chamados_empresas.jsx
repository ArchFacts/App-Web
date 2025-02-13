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
import api, { buscarChamadosNegocio, cadastrarChamado, definirParcela, buscarNomeProjeto } from '../../api';
import Spinner from '../../components/Spinner/spinner';
import { useLocation, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

function ChamadoInfo({ status, titulo, parcelaLabel, abertura, fechamento, finalizarIcone, onFinalizarClick, onDefinirParcelaClick, lucro }) {
    const getStatusStyle = (status) => {
        if (status === 'Em progresso') return { color: 'blue' };
        if (status === 'ABERTO') return { color: 'green' };
        if (status === 'FECHADO') return { color: 'red' };
        return {};
    };

    return (
        <div className={styles.infos}>
            <p className={styles.statusCell} style={getStatusStyle(status)}>
                {status}
            </p>
            <p className={styles.titleCell}>
                {titulo}
            </p>
            <button className={styles.parcelaCell} onClick={onDefinirParcelaClick}>
                {parcelaLabel}
            </button>
            <p className={styles.aberturaCell}>
                {abertura}
            </p>
            <p className={styles.fechamentoCell}>
                {fechamento}
            </p>
            <img src={finalizarIcone} className={styles.finalizarCell} alt="Finalizar" onClick={onFinalizarClick} />
        </div>
    );
}

function ChamadosEmpresa() {
    const [chamados, setChamados] = useState([]);
    const [nome, setNome] = useState('');
    const [titulo, setTitulo] = useState('');
    const [descricao, setDescricao] = useState('');
    const [dataAbertura, setDataAbertura] = useState('');
    const [dataFechamento, setDataFechamento] = useState('');
    const [lucro, setLucro] = useState('');
    const [parcelas, setParcelas] = useState(12);
    const [nomeProjeto, setNomeProjeto] = useState('');
    const total = lucro;

    const tiposModal = {
        abrir_chamado: 'abrirChamado',
        finalizar_chamado: 'finalizarChamado',
        definir_parcela: 'definirParcela',
    };

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [idChamado, setIdChamado] = useState(null);
    const [loading, setLoading] = useState(true)

    const location = useLocation();
    const { idProjeto } = location.state || {};
    console.log("idProjetoOOOOOOOO:", idProjeto);

    const carregarChamados = async (idProjeto) => {
        try {
            console.log("ID PROJETO DO CARREGAR ", idProjeto)
            const response = await buscarChamadosNegocio(idProjeto);
            console.log("ID PROJETO", idProjeto)
            console.log('Resposta dos chamados:', response.data);

            response.data.forEach((chamado) => {
                console.log("Lucro do chamado:", chamado.lucro);
            });


            setChamados(response.data);

        } catch (error) {
            console.error('Erro ao carregar os chamados:', error);
        } finally {
            setLoading(false);
        }
    };

    const buscarNomeProjetoFunc = async (idProjeto) => {
        try {
            const response = await buscarNomeProjeto(idProjeto);
            console.log(response.data);
            setNomeProjeto(response.data);
        } catch (error) {

        } finally {

        }
    }

    useEffect(() => {
        const { idProjeto } = location.state || {};
        console.log("idProjeto no useEffect:", idProjeto);

        if (idProjeto) {
            carregarChamados(idProjeto);
            buscarNomeProjetoFunc(idProjeto);
        } else {
            console.error("ID do projeto não encontrado");
        }
    }, [location.state]);

    useEffect(() => {
        const agora = new Date();
        const dataAtual = agora.toISOString().slice(0, 16);
        setDataAbertura(dataAtual);
    }, []);

    const abrirModal = (tipo, chamado) => {
        setTipoModal(tipo);
        if (tipo === tiposModal.finalizar_chamado) {
            setIdChamado(chamado.idChamado);
        }

        if (tipo === tiposModal.definir_parcela) {
            setLucro(chamados.find(c => c.idChamado === chamado)?.lucro || 0);
            setIdChamado(chamado);
        }
        setModalIsOpen(true);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const salvarChamado = async (e, idProjeto) => {
        e.preventDefault();
        console.log("idProjeto no salvarChamado:", idProjeto);

        let novaDataFechamento = dataFechamento;

        if (novaDataFechamento) {
            novaDataFechamento = `${novaDataFechamento}T23:59:00`;
        }

        const chamado = {
            titulo,
            descricao,
            abertura: dataAbertura,
            fechamento: novaDataFechamento,
            status: 'ABERTO',
            lucro: lucro,
        };

        try {
            const response = await cadastrarChamado(idProjeto, chamado);
            toast.success("Seu chamado foi salvo com sucesso");
            console.log("Chamado salvo", response);
            setTarefas([...chamados, response.data]);

            fecharModal();
        } catch (error) {
            console.error('Erro ao salvar o chamado:', error);
            // toast.error("Houve um erro ao enviar o seu chamado, por favor tente novamente");
        }
        fecharModal();
    };

    const handleDefinirParcelas = async () => {
        const parcela = {
            valor: Number(lucro),
            dataInicio: new Date().toISOString(),
            status: 'ABERTO',
            qtdParcelas: Number(parcelas),
            idChamado: idChamado,
        }

        try {
            await definirParcela(idProjeto, parcela);
            console.log("Entrou no try")
            console.log(parcela.dataInicio + "Data Inicio das parcelas")
            // if (idProjeto) {
            //     await carregarChamados(idProjeto);
            // }
            toast.success("Suas parcelas foram definidas com sucesso!");

        } catch (error) {
            console.error("Houve um erro ao definir a parcela", error);
            toast.error("Não foi possível definir a sua parcela, por favor tente novamente");
        }
        fecharModal();
    };

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };
    const formatarDataFechamento = (data) => {
        // if (!data || isNaN(new Date(data))) return 'Data não definida';
        // const date = new Date(data);
        // const dia = date.getDate();
        // const mes = date.toLocaleString('pt-BR', { month: 'short' });
        // return `${dia} de ${mes}`;

        if (!data || isNaN(new Date(data))) {
            return 'Data não definida';
        }

        const date = new Date(data);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} 23:59:00`;
    };

    const handleDataFechamentoChange = (e) => {
        const novaData = e.target.value;
        setDataFechamento(novaData);
    };

    const salvarFechamento = async (chamadoId) => {
        const novosChamados = chamados.map(chamado => {
            if (chamado.id === chamadoId) {
                return { ...chamado, status: 'Fechado' };
            }
            return chamado;
        });

        try {
            const response = await fetch(`${api}/chamados/${chamadoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: 'Fechado' }),
            });

            if (!response.ok) throw new Error('Falha ao finalizar o chamado');

            setChamados(novosChamados);
            fecharModal();
        } catch (error) {
            console.error('Erro ao finalizar o chamado:', error);
        }
    };

    if (loading) {
        return <Spinner />
    }

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
                        {chamados.length > 0 ? (
                            chamados.map((chamado) => (
                                <ChamadoInfo
                                    finalizarIcone={finalizarIcone}
                                    key={chamado.id}
                                    status={chamado.status || 'Pendente'}
                                    titulo={chamado.titulo || 'Sem título'}
                                    parcelaLabel={chamado.parcelaLabel || 'Definir parcelas'}
                                    abertura={formatarData(chamado.abertura)}
                                    fechamento={formatarData(chamado.fechamento)}
                                    onFinalizarClick={() => abrirModal(tiposModal.finalizar_chamado, chamado.id)}
                                    onDefinirParcelaClick={() => abrirModal(tiposModal.definir_parcela, chamado.idChamado)}
                                    lucro={chamado.lucro || 0}
                                />
                            ))
                        ) : (
                            <p>Não há chamados disponíveis</p>
                        )}
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
                        <button className={stylesPrestador.botao} onClick={handleDefinirParcelas}>Confirmar</button>
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
                    <h2>Abrir Chamado</h2>
                    <img src={fechar_icon}
                        alt="Fechar"
                        onClick={fecharModal} />
                </div>

                <div className={styles.modal_content}>
                    {/* <div className={styles.field}>
                        <label htmlFor="nome">Nome do solicitante:</label>
                        <input type="text" id="nome" placeholder="Digite seu nome" required value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </div> */}
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
                        <button className={stylesPrestador.botao} onClick={(e) => salvarChamado(e, idProjeto)}>Enviar</button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default ChamadosEmpresa;