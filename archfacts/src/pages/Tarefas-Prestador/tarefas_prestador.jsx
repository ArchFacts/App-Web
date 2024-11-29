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

function TarefaInfo({ status, titulo, parcelaLabel, abertura, fechamento, onDefinirParcelaClick, onFinalizarTarefaClick, onEditarTarefaClick }) {
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
                    onClick={() => onEditarTarefaClick()}
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
        </div>
    );
}

function TarefasPrestador() {
    const [tarefas, setTarefas] = useState([
        {
            id: '1',
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            id: '2',
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
    ]);

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


    const abrirModal = (tipo, idChamado) => {
        setTipoModal(tipo);
        setModalIsOpen(true);
        setIdChamado(idChamado);

        if (tipo === 'editarTarefa') {
            const tarefa = tarefas.find((tarefa) => tarefa.id === idChamado);
            if (tarefa) {
                setTitulo(tarefa.titulo);
                setDespesa(tarefa.parcelaLabel);
                setStatus(tarefa.status);
                setDataFechamento(tarefa.fechamento);
                setDescricao(tarefa.descricao || '');
            }
        }
    };

    const salvarEdicao = () => {
        setTarefas((prevTarefas) =>
            prevTarefas.map((tarefa) =>
                tarefa.id === idChamado
                    ? { ...tarefa, titulo, parcelaLabel: despesa, status, descricao: desc }
                    : tarefa
            )
        );
        fecharModal();
    };

    const fecharModal = () => {
        setModalIsOpen(false);
        setTipoModal(null);
    };

    const salvarFechamento = (idChamado) => {
        console.log(`Finalizando chamado com id: ${idChamado}`);
        fecharModal();
    };
    const salvarChamado = () => {
        console.log('Chamado salvo com:', {
            nome,
            titulo,
            dataFechamento,
            descricao,
            prioridade,
            status,
        });
        fecharModal();
    };

    const handleDataFechamentoChange = (e) => {
        setDataFechamento(e.target.value);
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
                                onDefinirParcelaClick={() => console.log('abrirTarefa', index)}
                                onEditarTarefaClick={() => abrirModal('editarTarefa', tarefa.id)}
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
                            type="text"
                            id="titulo"
                            placeholder="Digite o título"
                            required
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="despesa">Despesa:</label>
                        <input
                            type="text"
                            id="despesa"
                            placeholder="Digite a despesa"
                            required
                            value={despesa}
                            onChange={(e) => setDespesa(e.target.value)}
                        />
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.field2}>
                            <label htmlFor="prioridade">Prioridade:</label>
                            <select
                                id="prioridade"
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                                required>
                                <option value="">Selecione</option>
                                <option value="alta">Alta</option>
                                <option value="media">Média</option>
                                <option value="baixa">Baixa</option>
                            </select>
                        </div>
                        <div className={styles.field2}>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <option value="">Selecione</option>
                                <option value="aberto">Aberto</option>
                                <option value="fechado">Fechado</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Descrição:</label>
                        <textarea
                            id="desc"
                            required
                            value={desc}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="5"
                        />
                    </div>
                    <div className={styles.button_area}>
                        <button
                            className={stylesPrestador.botao}
                            type="submit"
                            onClick={salvarChamado}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={modalIsOpen && tipoModal === 'editarTarefa'}
                onRequestClose={fecharModal}
                contentLabel="Modal para editar uma tarefa"
                className={styles.modal_chamado}
                overlayClassName={styles.modal_overlay}>
                <div className={styles.modal_header}>
                    <h2>Editar tarefa</h2>
                    <img src={fechar_icon} alt="Fechar" onClick={fecharModal} />
                </div>
                <div className={styles.modal_content}>
                    <div className={styles.field}>
                        <label htmlFor="titulo">Título da tarefa:</label>
                        <input
                            type="text"
                            id="titulo"
                            placeholder="Digite o título"
                            required
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                        />
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="despesa">Despesa:</label>
                        <input
                            type="text"
                            id="despesa"
                            placeholder="Digite a despesa"
                            required
                            value={despesa}
                            onChange={(e) => setDespesa(e.target.value)}
                        />
                    </div>
                    <div className={styles.fields}>
                        <div className={styles.field2}>
                            <label htmlFor="prioridade">Prioridade:</label>
                            <select
                                id="prioridade"
                                value={prioridade}
                                onChange={(e) => setPrioridade(e.target.value)}
                                required>
                                <option value="">Selecione</option>
                                <option value="alta">Alta</option>
                                <option value="media">Média</option>
                                <option value="baixa">Baixa</option>
                            </select>
                        </div>
                        <div className={styles.field2}>
                            <label htmlFor="status">Status:</label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                required>
                                <option value="">Selecione</option>
                                <option value="aberto">Aberto</option>
                                <option value="fechado">Fechado</option>
                            </select>
                        </div>
                    </div>
                    <div className={styles.field}>
                        <label htmlFor="desc">Descrição:</label>
                        <textarea
                            id="desc"
                            required
                            value={desc}
                            onChange={(e) => setDescricao(e.target.value)}
                            rows="5"
                        />
                    </div>
                    <div className={styles.button_area}>
                        <button
                            className={stylesPrestador.botao}
                            type="submit"
                            onClick={salvarEdicao}>
                            Confirmar
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default TarefasPrestador;