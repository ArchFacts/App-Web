import React, { useEffect } from 'react';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import styles from './tarefas_prestador.module.css';
import TarefasName from '../../components/Tarefas-Name/tarefas_name';
import AbrirTarefa from '../../components/Abrir-Tarefa/abrir_tarefa';
import checkTarefa from '../../utils/assets/checkTarefa.png';
import editar from '../../utils/assets/editar.png';
import lixeira from '../../utils/assets/lixeira.png';

function TarefaInfo({ status, titulo, parcelaLabel, abertura, fechamento, onFinalizarClick, onDefinirParcelaClick }) {
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
                    src={checkTarefa}
                    alt="Finalizar"
                    className={styles.icon}
                    onClick={onFinalizarClick}
                />
            </div>
        </div>
    );
}

function TarefasPrestador() {
    const tarefas = [
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir despesa',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
    ];

    return (
        <div className={styles.container}>
            <SideBarColaborador />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <div className={styles.abrir_tarefa}>
                        <AbrirTarefa onAbrirChamadoClick={() => console.log('Abrir tarefa')}></AbrirTarefa>
                    </div>
                    <div className={styles.tarefas}>
                        <TarefasName title={'abelhas'}></TarefasName>
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
                                key={index}
                                {...tarefa}
                                onFinalizarClick={() => console.log('Finalizar tarefa', index)}
                                onDefinirParcelaClick={() => console.log('Definir parcela', index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TarefasPrestador;