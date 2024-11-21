import React from "react";
import styles from '../Prestador/projeto_componente_prestador.module.css'
import Calendar from "../Calendar/calendar";
import Status from "../Status/status";
import Financeiro from "../Financeiro/financeiro";
import Chamados from "../Chamados/chamados";
import ChamadosContagem from "../Chamados-Contagem/chamados_contagem";
import Tarefas from "../Tarefas/tarefas";
import TarefasContagem from "../../Tarefas-Contagem/tarefas_contagem";


const ProjetoComponentePrestador = ({ projectName, solicitanteName }) => {
    return (
        <div className={styles.project_box}>
            <div className={styles.detail_bar_top}>
                <p>{projectName}</p>
                <p>{solicitanteName}</p>
            </div>
            <div className={styles.content_area}>
                <div className={styles.group}>
                    <Financeiro valorPositivo={'R$+1730'}
                        valorNegativo={'R$-735'}
                    ></Financeiro>
                </div>
                <div className={styles.group}>
                    <Chamados></Chamados>
                    <ChamadosContagem number={25}></ChamadosContagem>
                    <TarefasContagem number={13}></TarefasContagem>
                    <Tarefas></Tarefas>
                </div>
                <div className={styles.group}>
                    <Calendar date={'07/03/25'}></Calendar>
                    <Status status={'EM PROGRESSO'}></Status>
                </div>
            </div>
            <div className={styles.detail_bar_bottom}></div>
        </div>
    )
}

export default ProjetoComponentePrestador;