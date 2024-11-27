import React, { useEffect } from 'react';
import SideBarColaborador from '../../components/Side-Bar-Colaborador/sideBarColaborador';
import styles from './chamados_prestador.module.css';
import ChamadosNamePrestador from '../../components/Chamados-Name-Prestador/chamados_name_prestador';
import lixeira from '../../utils/assets/lixeira.png';

function ChamadoPrestadorInfo({ status, titulo, parcelaLabel, abertura, fechamento, onFinalizarClick, onDefinirParcelaClick }) {
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
                    src={lixeira}
                    alt="Excluir"
                    className={styles.icon}
                />
            </div>
        </div>
    );
}

function ChamadosPrestador() {
    const chamadosPrestador = [
        {
            status: 'Em progresso',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Aberto',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
        {
            status: 'Fechado',
            titulo: 'Projeto de abelhas',
            parcelaLabel: 'Definir custo',
            abertura: '28 de março, 15:35',
            fechamento: '07 de abril, 21:02',
        },
    ];

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
                        <p className={styles.headerFinalizar}>Excluir</p>
                    </div>
                    <div className={styles.form}>
                        {chamadosPrestador.map((chamadoPrestador, index) => (
                            <ChamadoPrestadorInfo
                                key={index}
                                {...chamadoPrestador}
                                onFinalizarClick={() => console.log('Finalizar chamadoPrestador', index)}
                                onDefinirParcelaClick={() => console.log('Definir parcela', index)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChamadosPrestador;