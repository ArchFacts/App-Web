import React from "react";
import styles from "./chamados_contagem.module.css"

const ChamadosContagem = ({number}) => {
    return (
        <div className={styles.contagem}>
            <p>{number}</p>
        </div>
    );
}

export default ChamadosContagem;
