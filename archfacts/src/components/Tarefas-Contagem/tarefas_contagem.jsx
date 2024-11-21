import React from "react";
import styles from '../Tarefas-Contagem/tarefas_contagem.module.css'

const TarefasContagem = ({ number }) => {
    return (
        <div className={styles.contagem}>
            <p>{number}</p>
        </div>
    );
}

export default TarefasContagem;