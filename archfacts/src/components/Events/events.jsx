import React from "react";
import styles from "./events.module.css"


const events = ({ name, tipo, descricao, data, encerramento, previsao, status, statusColor }) => {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1>{name}</h1>
                </div>
                <div className={styles.conteudo}>
                    <span className={styles.texto}><b>Tipo:</b> {tipo}</span>
                    <span className={styles.texto}><b>Descrição:</b> {descricao}</span>
                    <span className={styles.texto}><b>Data Criação:</b> {data}</span>
                    <span className={styles.texto}><b>Previsão de encerramento:</b> {encerramento}</span>
                    <span className={styles.previsao}>{previsao}</span>
                    <span className={styles.status} style={{ backgroundColor: statusColor }}>
                        Status: {status}
                    </span>
                </div>
            </div>
        </>

    )
}
export default events;