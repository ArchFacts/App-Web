import React from "react";
import styles from './enterpriseScore.module.css'

const EnterpriseScore = ({ empresa, avaliacao, imagem }) => {
    return (
        <div className={styles.content}>
            <div className={styles.imgOut}>
                <div className={styles.imgIn}>
                    <img src={imagem} alt="" />
                </div>
            </div>
            <div className={styles.empresa}>{empresa}</div>
            <div className={styles.avaliacao}>Avaliação: <span>{avaliacao}</span></div>
        </div>
    )
}
export default EnterpriseScore;