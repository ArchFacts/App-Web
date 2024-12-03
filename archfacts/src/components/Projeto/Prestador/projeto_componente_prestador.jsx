import React from "react";
import styles from '../Prestador/projeto_componente_prestador.module.css'
import Calendar from "../Calendar/calendar";
import Status from "../Status/status";
import Financeiro from "../Financeiro/financeiro";
import Chamados from "../Chamados/chamados";
import ChamadosContagem from "../Chamados-Contagem/chamados_contagem";
import Tarefas from "../Tarefas/tarefas";
import TarefasContagem from "../../Tarefas-Contagem/tarefas_contagem";
import dash_icon from '../../../utils/assets/dash_icon.svg';

const ProjetoComponentePrestador = ({ projectName, solicitanteName, data, status, onClick, onClickChamados, handleDashClick }) => {
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
                        handleDashClick={handleDashClick}
                    ></Financeiro>
                </div>
                <div className={styles.group}>
                    <Chamados onClickChamados={onClickChamados}></Chamados>
                    {/* <ChamadosContagem number={25}></ChamadosContagem> */}
                    {/* <TarefasContagem number={13}></TarefasContagem> */}
                    <Tarefas onClick={onClick}></Tarefas>
                </div>
                <div className={styles.group}>
                    <Calendar date={data}></Calendar>
                    <Status status={status}></Status>
                </div>
            </div>
            <div className={styles.detail_bar_bottom}></div>
        </div>
    )
}

export default ProjetoComponentePrestador;