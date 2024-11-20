import React from 'react';
import SideBar from '../../components/Side-Bar/sideBar';
import styles from './chamados_empresa.module.css';
import iconeCheck from '../../utils/assets/check.png';

function ChamadoInfo({ status, titulo, parcelaLabel, abertura, fechamento, finalizarIcone }) {
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
            <button className={styles.parcelaCell}>{parcelaLabel}</button>
            <p className={styles.aberturaCell}>{abertura}</p>
            <p className={styles.fechamentoCell}>{fechamento}</p>
            <img src={finalizarIcone} className={styles.finalizarCell} alt="Finalizar" />
        </div>
    );
}

function ChamadosEmpresa() {
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

    return (
        <div className={styles.container}>
            <SideBar />
            <div className={styles.content}>
                <div className={styles.capsula}>
                    <span className={styles.text}>Chamados (Empresa)</span>
                    <div className={styles.welcome}></div>
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
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChamadosEmpresa;
