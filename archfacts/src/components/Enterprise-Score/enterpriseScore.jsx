import React from "react";
import styles from './enterpriseScore.module.css'
import sign from '../../utils/assets/sign.png'

const EnterpriseScore = ({empresa, avaliacao}) => {
    return (
        <div className={styles.content}>
            <div className={styles.imgOut}>
                <div className={styles.imgIn}>
                    <img src={sign} alt="" />
                </div>
            </div>                
            <div className={styles.empresa}>{empresa}</div>
            <div className={styles.avaliacao}>Avaliação: <span>{avaliacao}</span></div>
        </div>
    )
}
export default EnterpriseScore;