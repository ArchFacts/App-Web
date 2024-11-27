import React from "react";
import '../../utils/global.css';
import styles from '../Tarefas-Name/tarefas_name.module.css'

const TarefasName = ({ title }) => {
    return (
        <div className={styles.title_area}>
            <h1 className={styles.generic_tarefas_title}>Tarefas -</h1>
            <h1 className={styles.tarefas_title}>{title}</h1>
            <div className={styles.line}></div>
        </div>
    );
}

export default TarefasName;