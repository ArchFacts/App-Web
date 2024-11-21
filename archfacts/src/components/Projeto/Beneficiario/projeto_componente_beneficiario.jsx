import React, { useState } from "react";
import styles from '../Beneficiario/projeto_componente_beneficiario.module.css'
import Calendar from "../Calendar/calendar";
import Status from "../Status/status";
import Chamados from "../Chamados/chamados";
import ChamadosContagem from "../Chamados-Contagem/chamados_contagem";
import Finalizar from "../Finalizar/finalizar";
import Modal from 'react-modal';


const ProjetoComponenteBeneficiario = ({ name, onFinalizarClick }) => {
    
    return (
        <div className={styles.project_box}>
            <div className={styles.detail_bar_top}>
                <p>{name}</p>
            </div>
            <div className={styles.content_area}>
                <div className={styles.group}>
                    <Calendar date={'07/03/25'}></Calendar>
                    <Status status={'EM PROGRESSO'}></Status>
                </div>
                <div className={styles.group}>
                    <Chamados></Chamados>
                    <ChamadosContagem number={25}></ChamadosContagem>
                </div>
                <div className={styles.group}>
                    <div onClick={() => onFinalizarClick(name)}>
                        <Finalizar></Finalizar>
                    </div>
                </div>
            </div>
            <div className={styles.detail_bar_bottom}></div>
        </div>
    );
}

export default ProjetoComponenteBeneficiario;