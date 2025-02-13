import React, { useEffect, useState } from 'react';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import styles from './tarefas_prestador.module.css';
import TarefasName from '../../components/Tarefas-Name/tarefas_name';
import AbrirTarefa from '../../components/Abrir-Tarefa/abrir_tarefa';
import check from '../../utils/assets/check.png';
import editar from '../../utils/assets/editar.png';
import lixeira from '../../utils/assets/lixeira.png';
import Modal from 'react-modal';
import fechar_icon from '../../utils/assets/modal-x.svg';
import stylesPrestador from '../Chamados-Prestador/chamados_prestador.module.css';
import { buscarTarefasNegocio, dadosUsuarioLogado, cadastrarTarefa, buscarNomeProjeto, buscarTodasTarefas } from '../../api';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

function TarefaInfo({ status, titulo, despesa, abertura, fechamento, onFinalizarTarefaClick, onDefinirDespesaClick, onEncerrarTarefaClick }) {
    const getStatusStyle = (status) => {
        if (status === 'Em progresso') return { color: 'blue' };
        if (status === 'Aberto') return { color: 'green' };
        if (status === 'Fechado') return { color: 'red' };
        return {};
    };

    return (
        <div className={styles.infos}>
            <p className={styles.statusCell} style={getStatusStyle(status)}>
                {status}
            </p>
            <p className={styles.titleCell}>{titulo}</p>
            {((typeof (despesa) !== 'number') || despesa == 0) ? (
                <button className={styles.parcelaCell} onClick={() => onDefinirDespesaClick()}>
                    Definir despesa
                </button>
            ) : (
                <p className={styles.valor_despesa}>{`R$${despesa}`}</p>
            )}
            <p className={styles.aberturaCell}>{abertura}</p>
            <p className={styles.fechamentoCell}>{fechamento}</p>
            <div className={styles.finalizarCell}>
                <img
                    src={editar}
                    alt="Editar"
                    className={styles.icon}
                    onClick={() => console.log('Editar tarefa')}
                />
                <img
                    src={lixeira}
                    alt="Excluir"
                    className={styles.icon}
                    onClick={() => onEncerrarTarefaClick()}
                />
                <img
                    src={check}
                    alt="Finalizar"
                    className={styles.icon}
                    onClick={() => onFinalizarTarefaClick()}
                />
            </div>
        </div>
    );
}

function TarefasPrestador() {
    const [tarefas, setTarefas] = useState([]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [idChamado, setIdChamado] = useState(null);

    const [nome, setNome] = useState('');
    const [titulo, setTitulo] = useState('');
    const [dataFechamento, setDataFechamento] = useState('');
    const [despesa, setDespesa] = useState('');
    const [prioridade, setPrioridade] = useState('');
    const [status, setStatus] = useState('');
    const [desc, setDescricao] = useState('');
    const [dataTermino, setDataTermino] = useState('');

    const [usuario, setUsuario] = useState(null);
    const [loading, setLoading] = useState(true)

    const location = useLocation();
    const idProjeto = location.state?.idProjeto;

    const [nomeProjeto, setNomeProjeto] = useState(null);

    console.log("ID DO PROJETOProjeto recebido", idProjeto);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "titulo") setTitulo(value);
        if (name === "despesa") setDespesa(value.replace(/[^0-9]/g, ''));
        if (name === "prioridade") setPrioridade(value);
        if (name === "status") setStatus(value);
        if (name === "desc") setDescricao(value);
        if (name === "dataTermino") {
            const selectedDate = new Date(value);
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (selectedDate < today) {
                toast.error("A data de término não pode ser anterior ao dia de hoje.");
                return;
            }
            setDataTermino(value);
        }
    };

    const abrirModal = (tipo, idChamado) => {
        setTipoModal(tipo);
        setModalIsOpen(true);
        setIdChamado(idChamado);
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const salvarFechamento = (idChamado) => {
        console.log(`Finalizando chamado com id: ${idChamado}`);
        fecharModal();
    };

    const salvarTarefa = async () => {
        setLoading(true);
        const novaDataTermino = `${dataTermino}T23:59:00`;
        const tarefa = {
            titulo,
            despesa,
            prioridade,
            status,
            dataTermino: novaDataTermino,
            descricao: desc,
        };

        try {
            const response = await cadastrarTarefa(idProjeto, tarefa);
            toast.success("Sua tarefa foi salva com sucesso:");
            console.log("Tarefa salva", response);
            setTarefas([...tarefas, response.data]); // Adiciona nova tarefa à lista
            buscarTarefasNegocio(idProjeto);
            formatarData(response.tarefa.dataInicio);
            fecharModal();
        } catch (error) {
            console.log("Houve um erro ao enviar a sua tarefa!", error);
            toast.error("Houve um erro ao enviar a sua tarefa, por favor tente novamente");
        }
        finally {
            setLoading(false);
        }
        fecharModal();
    };

    // const handleDataFechamentoChange = (e) => {
    //     setDataFechamento(e.target.value);
    // };

    const buscarDadosUsuarioLogado = async () => {
        setLoading(true);
        try {
            const response = await dadosUsuarioLogado();
            setUsuario(response.data);
            console.log(response.data);
        } catch (error) {
            console.error("Erro ao buscar os dados do usuário", error);
        }
        finally {
            setLoading(false);
        }
    };

    const buscarTarefas = async (idProjeto) => {
        if (!usuario) {
            console.error("Usuário não encontrado");
            return;
        }

        try {
            const response = idProjeto ? await buscarTarefasNegocio(idProjeto) : await buscarTodasTarefas();
            setTarefas(response.data);
            console.log("BUSCANDO TAREFA", response.data);
        } catch (error) {
            console.error("Erro ao buscar as tarefas do negócio", error);
        }
    }

    const formatarData = (data) => {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    const buscarNomeProjetoFunc = async (idProjeto) => {
        try {
            console.log("ENTROU NA FUNÇÃO DO PROJETO");
            const response = await buscarNomeProjeto(idProjeto);
            setNomeProjeto(response.data);
            console.log("NOME DO PROJETO" + response.data);
        } catch (error) {
            console.error("Erro ao buscar o nome do projeto", error);
        }
    }

    useEffect(() => {
        buscarDadosUsuarioLogado();
        if (idProjeto) {
            buscarNomeProjetoFunc(idProjeto)
        }
    }, [idProjeto]);

    useEffect(() => {
        if (usuario) {
            buscarTarefas(idProjeto);
        }
    }, [usuario, idProjeto]);

    const [valorInput, setValorInput] = useState('');
    const confirmarCusto = () => {
        if (!valorInput || isNaN(valorInput)) {
            toast.error("Por favor, insira um valor válido.");
            return;
        }
        console.log("Custo definido:", valorInput);
        buscarTarefas(idProjeto);
        fecharModal();
    };

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    {idProjeto && (
                        <div className={styles.abrir_tarefa}>
                            <AbrirTarefa onAbrirTarefaClick={() => abrirModal('abrirTarefa')} />
                        </div>
                    )}
                    <div className={styles.tarefas}>
                        <TarefasName number={tarefas.length} title={nomeProjeto || "Todas as tarefas"} />
                    </div>
                </div>
                <div className={styles.formContainer}>
                    <div className={styles.barraSuperior}>
                        <p className={styles.headerStatus}>Status</p>
                        <p className={styles.headerTitle}>Título</p>
                        <p className={styles.headerParcela}>Despesa</p>
                        <p className={styles.headerAbertura}>Data de abertura</p>
                        <p className={styles.headerFechamento}>Data de fechamento</p>
                        <p className={styles.headerFinalizar}>Editar/Excluir/Finalizar</p>
                    </div>
                    <div className={styles.form}>
                        {tarefas.length > 0 ? (
                            tarefas.map((tarefa, key) => (
                                <TarefaInfo
                                    key={tarefa.id}
                                    {...tarefa}
                                    status={tarefa.status}
                                    fechamento={formatarData(tarefa.dataTermino)}
                                    abertura={formatarData(tarefa.dataInicio)}
                                    onFinalizarTarefaClick={() => abrirModal('finalizarTarefa', tarefa.id)}
                                    onDefinirParcelaClick={() => console.log('abrirTarefa', tarefa.id)}
                                    onDefinirDespesaClick={() => abrirModal('definirDespesa', tarefa.id)}
                                    onEncerrarTarefaClick={() => abrirModal('excluirTarefa', tarefa.id)}
                                />
                            ))
                        ) : (
                            <p>Não há tarefas disponíveis</p>
                        )}
                    </div>
                </div>
            </div>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'finalizarTarefa'}
                onRequestClose={fecharModal}
                contentLabel="Modal para finalizar a tarefa"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}>
                <div className={styles.modal_header}>
                    <h2>Finalizar tarefa</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <p>Deseja confirmar a finalização desta tarefa?</p>
                    <button
                        className={stylesPrestador.botao}
                        onClick={() => salvarFechamento(idChamado)}>
                        Confirmar
                    </button>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'abrirTarefa'}
                onRequestClose={fecharModal}
                contentLabel="Modal para abrir uma tarefa"
                className={stylesPrestador.modal_tarefa}
                overlayClassName={stylesPrestador.modal_overlay}>
                <div className={stylesPrestador.modal_header}>
                    <h2>Criar tarefa</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={stylesPrestador.modal_content}>
                    <div className={stylesPrestador.field}>
                        <label htmlFor="titulo">Título da tarefa:</label>
                        <input
                            name='titulo'
                            type="text"
                            id="titulo"
                            placeholder="Digite o título"
                            required
                            value={titulo}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={stylesPrestador.field}>
                        <label htmlFor="despesa">Despesa:</label>
                        <input
                            name='despesa'
                            type="text"
                            id="despesa"
                            placeholder="Digite a despesa"
                            required
                            value={despesa}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={stylesPrestador.fields}>
                        <div className={stylesPrestador.field2}>
                            <label htmlFor="prioridade">Prioridade:</label>
                            <select
                                id="prioridade"
                                name='prioridade'
                                value={prioridade}
                                onChange={handleChange}
                                required>
                                <option value="">Selecione</option>
                                <option value="ALTA">Alta</option>
                                <option value="MEDIA">Média</option>
                                <option value="BAIXA">Baixa</option>
                            </select>
                        </div>
                        <div className={stylesPrestador.field2}>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name='status'
                                value={status}
                                onChange={handleChange}
                                required>
                                <option value="">Selecione</option>
                                <option value="PROGRESSO">Em progresso</option>
                                <option value="ABERTO">Aberto</option>
                                <option value="FECHADO">Fechado</option>
                            </select>
                        </div>
                    </div>
                    <div className={stylesPrestador.field}>
                        <label htmlFor="Prazo de término">Prazo de término:</label>
                        <input
                            name='dataTermino'
                            type="date"
                            id="dataTermino"
                            value={dataTermino}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={stylesPrestador.field}>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                            name='desc'
                            id="descricao"
                            rows="4"
                            placeholder="Descrição"
                            value={desc}
                            onChange={handleChange}></textarea>
                    </div>
                    <div className={stylesPrestador.botao_area}>
                        <button
                            className={stylesPrestador.botao}
                            onClick={salvarTarefa}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'definirDespesa'}
                onRequestClose={fecharModal}
                contentLabel="Modal para definir a despesa"
                className={stylesPrestador.modalParcela}
                overlayClassName={stylesPrestador.modal_overlay}
            >
                <div className={stylesPrestador.modal_header}>
                    <span className={stylesPrestador.nimbus_money}></span>
                    <h2>Definir despesa</h2>
                    <img className={stylesPrestador.fechar} src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={stylesPrestador.modal_content}>
                    <div className={stylesPrestador.parcelas}>
                        Projeto
                    </div>
                    <div className={stylesPrestador.price_field}>
                        <p> R$</p>
                        <input onChange={(e) => setValorInput(e.target.value.replace(/[^0-9]/g, ''))} type="number" />
                    </div>
                    <button className={stylesPrestador.botao} onClick={confirmarCusto}>Confirmar</button>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'excluirTarefa'}
                onRequestClose={fecharModal}
                contentLabel="Modal para excluir a tarefa"
                className={styles.modal}
                overlayClassName={styles.modal_overlay}>
                <div className={styles.modal_header}>
                    <h2>Excluir tarefa</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <p>Deseja confirmar o encerramento desta tarefa?</p>
                    <button
                        className={stylesPrestador.botao}
                        onClick={() => salvarFechamento(idChamado)}>
                        Confirmar
                    </button>
                </div>
            </Modal>
        </div>
    );
}

export default TarefasPrestador;