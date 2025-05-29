import React from "react";
import '../../utils/global.css';
import styles from '../Chamados-Name-Prestador/chamados_name_prestador.module.css'
import ContagemChamados from '../../components/Projeto/Chamados-Contagem/chamados_contagem';

const ChamadosNamePrestador = ({ title, number }) => {
    return (
        <div className={styles.title_area}>
            <h1 className={styles.generic_chamados_prestador_title}>Chamados</h1>
            <h1 className={styles.chamados_prestador_title}>{title}</h1>
            <ContagemChamados number={number}></ContagemChamados>
            <div className={styles.line}></div>
        </div>
    );
}

export default ChamadosNamePrestador;