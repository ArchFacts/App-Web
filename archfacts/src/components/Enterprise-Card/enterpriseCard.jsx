import React from "react";
import styles from "./enterpriseCard.module.css"

const EnterpriseCard = () => {
    return (
            <div className={styles.card}>
                <div className={styles.leftCard}>
                    <div className={styles.imagemEmpresa}></div>
                </div>
                <div className={styles.rightCard}>
                    <h2>ECORP</h2>
                    <h3>Chamados com a empresa: 5</h3>

                <button className={styles.cardButton}>Meus chamados</button>
                </div>
                
            </div>
}
export default EnterpriseCard;