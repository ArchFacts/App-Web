import React from "react";
import styles from './modal_servico.module.css'

const ModalServico = ({Titulo, Img, Text, ButtonText}) => {
    return (
        <div className={styles.content}>
            <div className={styles.modal}>
                <div className={styles.upperBar}>
                    <img className={styles.img} src={Img} alt="" />
                    <h1 style={{ fontSize: '2.1rem' }}>{Titulo}</h1>
                </div>
                <div className={styles.textDiv}>
                    <p className={styles.textoEmpresa}>{Text}</p>
                </div>
                <div className={styles.lowerBar}>
                    <button className={styles.closeButton}>{ButtonText}</button>
                </div>

            </div>
        </div>
    )
}
export default ModalServico;