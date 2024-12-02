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
import { buscarTarefasNegocio, dadosUsuarioLogado, cadastrarTarefa } from '../../api';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import Spinner from '../../components/Spinner/spinner';

function TarefaInfo({ status, titulo, parcelaLabel, abertura, fechamento, onFinalizarTarefaClick, onEditarTarefaClick, onEncerrarTarefaClick, onDefinirDespesaClick, despesaDefinida, onDesfazerDespesaClick }) {
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
            <button className={styles.parcelaCell} onClick={onDefinirParcelaClick}>
                {parcelaLabel}
            </button>
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
                    onClick={() => console.log('Excluir tarefa')}
                />
                <img
                    src={check}
                    alt="Finalizar"
                    className={styles.icon}
                    onClick={() => onFinalizarTarefaClick()}
                />
            </div>

            {/* {despesaDefinida && (
                <button
                    className={stylesPrestador.botao}
                    onClick={() => onDesfazerDespesaClick()}>
                    Desfazer
                </button>
            )} */}
        </div>
    );
}

function TarefasPrestador() {
    const [tarefas, setTarefas] = useState([
        // {
        //     id: '1',
        //     status: 'Em progresso',
        //     titulo: 'Projeto de abelhas',
        //     parcelaLabel: 'Definir despesa',
        //     abertura: '28 de março, 15:35',
        //     fechamento: '07 de abril, 21:02',
        // },
        // {
        //     id: '2',
        //     status: 'Aberto',
        //     titulo: 'Projeto de abelhas',
        //     parcelaLabel: 'Definir despesa',
        //     abertura: '28 de março, 15:35',
        //     fechamento: '07 de abril, 21:02',
        // },
    ]);

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [tipoModal, setTipoModal] = useState(null);
    const [idChamado, setIdChamado] = useState(null);
    const [despesasRemovidas, setDespesasRemovidas] = useState([]);

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

    console.log("ID DO PROJETOProjeto recebido", idProjeto);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "titulo") setTitulo(value);
        if (name === "despesa") setDespesa(value);
        if (name === "prioridade") setPrioridade(value);
        if (name === "status") setStatus(value);
        if (name === "desc") setDescricao(value);
        if (name === "dataTermino") setDataTermino(value);
    };

    // if (loading) {
    //     return <Spinner />;  
    // }
    const [valorDespesa, setValorDespesa] = useState('');

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

        const novaDataTermino = `${dataTermino}T23:59:00`;  // Adicionando a hora para poder inserir no banco

        const tarefa = {
            titulo,
            despesa,
            prioridade,
            status,
            novaDataTermino,
            descricao: desc,
        };

        try {
            const response = await cadastrarTarefa(idProjeto, tarefa);
            toast.success("Sua tarefa foi salva com sucesso:");
            console.log("Tarefa salva", response);
            setTarefas([...tarefas, response.data]); // Adiciona nova tarefa à lista

            fecharModal();
        } catch (error) {
            console.log("Houve um erro ao enviar a sua tarefa!", error);
            toast.error("Houve um erro ao enviar a sua tarefa, por favor tente novamente");
        }
        finally {
            // setLoading(false);
        }
        fecharModal();
    };

    const confirmarCusto = () => {
        console.log("Custo definido:", valorInput);
        fecharModal();
    };

    const confirmarDespesa = () => {
        if (!valorInput || isNaN(valorInput) || valorInput < 0) {
            alert('Por favor, insira um valor válido para a despesa.');
            return;
        }
        definirDespesa(idChamado, valorInput);
    };

    const definirDespesa = (idChamado, valorDespesa) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === idChamado
                    ? {
                        ...tarefa,
                        parcelaLabel: valorDespesa,
                        despesaDefinida: true,
                    }
                    : tarefa
            )
        );
        setDespesasRemovidas((prev) => [
            ...prev,
            { id: idChamado, valor: valorDespesa },
        ]);
    };

    const desfazerDespesa = (idChamado) => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === idChamado
                    ? {
                        ...tarefa,
                        parcelaLabel: "Definir despesa",
                        despesaDefinida: false,
                    }
                    : tarefa
            )
        );
        setValorDespesa('');
    };

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <div className={styles.abrir_tarefa}>
                        <AbrirTarefa onAbrirTarefaClick={() => abrirModal('abrirTarefa')} />
                    </div>
                    <div className={styles.tarefas}>
                        <TarefasName title={'abelhas'} />
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
                        {tarefas.map((tarefa, index) => (
                            <TarefaInfo
                                key={tarefa.id}
                                {...tarefa}
                                onFinalizarTarefaClick={() => abrirModal('finalizarTarefa', tarefa.id)}
                                onEditarTarefaClick={() => abrirModal('editarTarefa', tarefa.id)}
                                onEncerrarTarefaClick={() => abrirModal('excluirTarefa', tarefa.id)}
                                onDefinirDespesaClick={() => abrirModal('definirDespesa', tarefa.id)}
                                onDesfazerDespesaClick={() => desfazerDespesa(tarefa.id)}
                            />
                        ))}
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
                    <p>Deseja confirmar o encerramento desta tarefa?</p>
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
                className={styles.modal_chamado}
                overlayClassName={styles.modal_overlay}>
                <div className={styles.modal_header}>
                    <h2>Criar tarefa</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <div className={styles.field}>
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
                    <div className={styles.field}>
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
                    <div className={styles.fields}>
                        <div className={styles.field2}>
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
                        <div className={styles.field2}>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                name='status'
                                value={status}
                                onChange={handleChange}
                                required>
                                <option value="">Selecione</option>
                                <option value="EM PROGRESSO">Em progresso</option>
                                <option value="ABERTO">Aberto</option>
                                <option value="FECHADO">Fechado</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="Prazo de término">Prazo de término</label>
                        <input
                            name='dataTermino'
                            type="date"
                            id="dataTermino"
                            value={dataTermino}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="descricao">Descrição:</label>
                        <textarea
                            name='desc'
                            id="descricao"
                            rows="4"
                            placeholder="Descrição"
                            value={desc}
                            onChange={handleChange}></textarea>
                    </div>
                    <button
                        className={stylesPrestador.botao}
                        onClick={salvarTarefa}>
                        Salvar
                    </button>
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
                        Projeto de abelhas
                    </div>
                    <div className={stylesPrestador.price_field}>
                        <p> R$</p>
                        <input
                            type="number"
                            value={valorInput}
                            onChange={(e) => setValorInput(e.target.value)}
                        />
                    </div>
                    <div className={stylesPrestador.areaConfirmar}>
                        <button
                            className={stylesPrestador.botao}
                            onClick={() => {
                                confirmarDespesa();
                                fecharModal();
                            }}>
                            Confirmar
                        </button>

                        {tarefas.find((tarefa) => tarefa.id === idChamado)?.despesaDefinida && (
                            <button
                                className={stylesPrestador.botaoDesfazer}
                                onClick={() => {
                                    desfazerDespesa(idChamado);
                                    fecharModal();
                                }}>
                                Desfazer
                            </button>
                        )}
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TarefasPrestador;
