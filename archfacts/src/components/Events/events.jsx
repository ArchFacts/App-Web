import React from "react";
import styles from "./events.module.css"


const events = ({name, tipo, descricao, data, encerramento, dia, horas, minutos, status}) => {
    return (
        <>
        <div className={styles.card}>
            <div className={styles.header}>
                <h1>{name}</h1>
            </div>
            <div className={styles.conteudo}>
                <span className={styles.texto}>Tipo: {tipo}</span>
                <span className={styles.texto}>Descrição: {descricao}</span>
                <span className={styles.texto}>Data Criação: {data}</span>
                <span className={styles.texto}>Previsão de encerramento: {encerramento}</span>
                <span className={styles.previsao}>{dia} Dias, {horas} horas e {minutos} minutos restantes para a previsão</span>
                <span className={styles.status}>Status: {status}</span>
            </div>
        </div>
        </>

    )
}
export default events;