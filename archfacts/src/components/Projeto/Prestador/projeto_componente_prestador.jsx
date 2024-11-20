import React from "react";
import styles from '../Prestador/projeto_componente_prestador.module.css'
import Calendar from "../Calendar/calendar";
import Status from "../Status/status";

const ProjetoComponentePrestador = ({ projectName, solicitanteName }) => {
    return (
        <div className={styles.project_box}>
            <div className={styles.detail_bar_top}>
                <p>{projectName}</p>
                <p>{solicitanteName}</p>
            </div>
            <div className={styles.content_area}>
                <div className={styles.group}>

                </div>
                <div className={styles.group}>

                </div>
                <div className={styles.group}>
                    <Calendar></Calendar>
                    <Status></Status>
                </div>
            </div>
        </div>
    )
}

export default ProjetoComponentePrestador;