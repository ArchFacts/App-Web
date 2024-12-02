import React from "react";
import styles from "./KpiFinanceiro.module.css"


const events = ({card, mes, valor, porcentagem, empresa}) => {
    return (
        <>
        <div className={styles.kpi}>
                    <span className={styles.tituloKpi}>{card} {mes}</span>
                    <div>
                        <span className={styles.valorKpi}>R${valor}</span>
                        <span className={styles.porcentagemKpi}>{porcentagem}</span>    
                    </div>
                    <span className={styles.empresaKpi}>{empresa}</span>
                </div>
        </>

    )
}
export default events;