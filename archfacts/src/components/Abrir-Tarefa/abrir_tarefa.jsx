import React from "react";
import styles from '../Abrir-Tarefa/abrir_tarefa.module.css'
import adicionar_icon from "../../utils/assets/plus_signal.svg"

const AbrirTarefa = ({ onAbrirTarefaClick }) => {
    return (
        <div className={styles.abrir_tarefa} onClick={onAbrirTarefaClick}>
            <h1>Criar tarefa</h1>
            <img src={adicionar_icon} alt="icone de adicionar" width={60} height={50} />
        </div>
    );
};

export default AbrirTarefa;