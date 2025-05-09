import React from "react";
import '../../utils/global.css';
import styles from '../Chamados-Name/chamados_name.module.css'
import ChamadosContagem from '../../components/Projeto/Chamados-Contagem/chamados_contagem';

const ChamadosName = ({ title, number }) => {
    return (
        <div className={styles.title_area}>
            <h1 className={styles.generic_chamado_title}>Chamados</h1>
            <h1 className={styles.chamado_title}>{title}</h1>
            <ChamadosContagem number={number}></ChamadosContagem>
            <div className={styles.line}></div>
        </div>
    );
}

export default ChamadosName